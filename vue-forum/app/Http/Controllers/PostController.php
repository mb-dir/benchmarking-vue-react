<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(){
        $canLogin = Route::has('login');
        $canRegister = Route::has('register');
        $categories = Category::all();
        $posts = Post::with(['user', 'tags', 'categories'])->paginate(5);

        return Inertia::render('Posts/Index', compact('canLogin', 'canRegister', 'categories', 'posts'));
    }

    public function show(Post $post){

        $post->load('user', 'comments.user', 'categories', 'tags');
        
        return Inertia::render('Posts/Show', compact('post'));
    }
}
