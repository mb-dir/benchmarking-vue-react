<?php

namespace App\Http\Controllers\Web;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function index(Request $request, Category $category = null)
    {
        $categoryId = $category ? $category->id : null;
        $tagIds = $request->tag ?? null;

        $categories = Category::withPosts()->take(5)->get();
        if ($categories->isEmpty()) {
            $categories = Category::take(5)->get();
        }

        $tags = Tag::all();
        $currentTags = null;

        if (is_array($tagIds)) {
            $currentTags = Tag::whereIn('id', $tagIds)->get();
        } else {
            $currentTags = Tag::where('id', $tagIds)->get();
        }

        $query = Post::with(['user', 'tags', 'categories'])->orderBy('created_at', 'desc');

        if ($categoryId) {
            $query->whereHas('categories', function ($q) use ($categoryId) {
                $q->where('categories.id', $categoryId);
            });
        }

        if (is_array($tagIds)) {
            $query->whereHas('tags', function ($q) use ($tagIds) {
                $q->whereIn('tags.id', $tagIds);
            });
        } elseif ($tagIds) {
            $query->whereHas('tags', function ($q) use ($tagIds) {
                $q->where('tags.id', $tagIds);
            });
        }

        $posts = $query->paginate(5)->withQueryString();

        return Inertia::render('Posts/Index', [
            'categories' => $categories,
            'posts' => $posts,
            'tags' => $tags,
            'currentCategory' => $category,
            'currentTags' => $currentTags,
        ]);
    }

    public function show(Post $post)
    {
        $post->load('user', 'comments.user', 'categories', 'tags');
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('Posts/Show', compact('post', 'categories', 'tags'));
    }


    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('Posts/Create', compact('categories', 'tags'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'required|array',
            'categories' => 'required|array',
            'tags.*.id' => 'required|integer|exists:tags,id',
            'categories.*.id' => 'required|integer|exists:categories,id',
        ]);

        $post = Post::create([
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
            'user_id' => Auth::id(),
        ]);


        // m2m ralation
        // array_column($validatedData['tags'], 'id') - gets all id field from tags and returns it as an array
        $post->tags()->sync(array_column($validatedData['tags'], 'id'));
        $post->categories()->sync(array_column($validatedData['categories'], 'id'));

        return redirect()->route('posts.show', compact('post'))->with('message', 'Post został dodany');;
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')->with('message', 'Post został usunięty');;
    }

    public function update(Post $post, Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'required|array',
            'categories' => 'required|array',
            'tags.*.id' => 'required|integer|exists:tags,id',
            'categories.*.id' => 'required|integer|exists:categories,id',
        ]);

        $post->update($validatedData);

        // update m2m
        $post->tags()->sync(array_column($validatedData['tags'], 'id'));
        $post->categories()->sync(array_column($validatedData['categories'], 'id'));

        return redirect()->back()->with('message', 'Post został zaktualizowany');
    }
}
