<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    private $userResource;

    public function toArray(Request $request): array
    {
        return $this->collection->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'user' => UserResource::make($post->user),
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
        })->toArray();
    }
}
