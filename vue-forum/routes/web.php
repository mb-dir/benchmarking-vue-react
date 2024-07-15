<?php

use App\Http\Controllers\Api\PostController as ApiPostController;
use App\Http\Controllers\Web\CategoryController;
use App\Http\Controllers\Web\CommentController;
use App\Http\Controllers\Web\PostController;
use App\Http\Controllers\Web\ProfileController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/posts/category');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comment.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comment.update');
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::get('/posts/user/{user}', [PostController::class, 'postUserIndex'])->name('posts.user.index');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
});

Route::get('/posts/category/{category?}', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');


Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

//api

Route::get('/api/posts', [ApiPostController::class, 'index'])->name('api.posts.index');

require __DIR__ . '/auth.php';
