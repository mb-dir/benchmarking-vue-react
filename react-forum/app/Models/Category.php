<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function posts() {
        return $this->belongsToMany(Post::class, 'post_category');
    }

    // https://medium.com/@gromret/laravel-scopes-a-powerful-feature-for-query-filtering-90905ed0e033
    public function scopeWithPosts($query) {
        return $query->whereHas('posts');
    }
}
