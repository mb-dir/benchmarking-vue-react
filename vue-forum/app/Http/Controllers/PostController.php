<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class PostController extends Controller
{
    public function index(Request $request, Category $category)
    {
        $currentCategory = $category;
        $categoryId = $category->id;
        $tagId = $request->tag;
        $currentTags = $request->tags ?? [];

        // dd($currentTags);

        // Gets only first 5 categories with already assigned posts, otherwise take just 5 categories
        $categories = Category::withPosts()->get()->take(5);
        $tags = Tag::all();

        if ($categories->isEmpty()) {
            $categories = Category::all()->take(5);
        }

        // Build the query
        $query = Post::with(['user', 'tags', 'categories'])->orderBy('created_at', 'desc');

        // If category ID exists, filter the posts by category
        if ($categoryId) {
            $query->whereHas('categories', function ($q) use ($categoryId) {
                $q->where('categories.id', $categoryId);
            });
        }

        // If tag ID exists, filter the posts by tag
        if (is_array($tagId)) {
            $query->whereHas('tags', function ($q) use ($tagId) {
                $q->whereIn('tags.id', $tagId);
            });
        } elseif ($tagId) {
            $query->whereHas('tags', function ($q) use ($tagId) {
                $q->where('tags.id', $tagId);
            });
        }
        // Paginate the results
        $posts = $query->paginate(5)->withQueryString();

        return Inertia::render('Posts/Index', compact('categories', 'posts', 'tags', 'currentCategory', 'currentTags'));
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
