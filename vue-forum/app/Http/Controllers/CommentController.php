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

        return redirect()->back()->with('message', 'Komentarz został dodany');
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->back()->with('message', 'Komentarz został usunięty');
    }

    public function update(Request $request, Comment $comment){
        $validatedData = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $comment->update($validatedData);
        return redirect()->back()->with('message', 'Komentarz został zaktualizowany');
    }
}
