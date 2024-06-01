<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->category;
        $canLogin = Route::has('login');
        $canRegister = Route::has('register');
        $categories = Category::all();

        // Build the query
        $query = Post::with(['user', 'tags', 'categories'])->orderBy('created_at', 'desc');

        // If category ID exists, filter the posts by category
        if ($categoryId) {
            $query->whereHas('categories', function($q) use ($categoryId) {
                $q->where('categories.id', $categoryId);
            });
        }

        // Paginate the results
        $posts = $query->paginate(5);

        return Inertia::render('Posts/Index', compact('canLogin', 'canRegister', 'categories', 'posts'));
    }

    public function show(Post $post)
    {
        $post->load('user', 'comments.user', 'categories', 'tags');
        
        return Inertia::render('Posts/Show', compact('post'));
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
        $post->tags()->sync(array_column($validatedData['tags'], 'id'));
        $post->categories()->sync(array_column($validatedData['categories'], 'id'));

        return redirect()->route('posts.show', ['post' => $post->id]);
    }
}
