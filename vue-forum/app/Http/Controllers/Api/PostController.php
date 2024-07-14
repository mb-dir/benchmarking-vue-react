<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollection;
use App\Models\Post;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        if (is_null($search)) {
            return response()->json(['error' => 'Brak wymaganego parametru'], 400);
        }

        if (strlen($search) < 3) {
            return response()->json(['error' => 'Parametr serach musi zawierać przynajmniej 3 znaki'], 400);
        }

        // Fetch posts where title or content includes the search term, limited to 5 posts
        $posts = Post::where('title', 'like', "%{$search}%")
            ->orWhere('content', 'like', "%{$search}%")
            ->limit(5)
            ->get();

        if ($posts->isEmpty()) {
            return response()->json(['error' => "Brak pasujących wyników dla: '{$search}'"], 404);
        }

        return new PostCollection($posts);
    }
}
