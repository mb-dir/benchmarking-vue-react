<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
     public function store(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'content' => 'required|string|max:255',
        ]);
        $validatedData['user_id'] = Auth::id();
        $validatedData['post_id'] = $post->id;

        Comment::create($validatedData);

        return redirect()->back();
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->back();
    }
}
