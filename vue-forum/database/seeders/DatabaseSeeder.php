<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create users
        $users = User::factory()->count(2)->create();

        // Create categories
        $categories = collect([
            'Programowanie',
            'Sieci',
            'Sprzęt',
            'Cyberbezpieczeństwo',
            'Bazy danych',
            'Projektowanie interfejsów',
            'Sztuczna inteligencja',
            'Grafika komputerowa',
            'Systemy operacyjne',
            'Rozwój oprogramowania',
            'Internet rzeczy (IoT)',
            'Analiza danych',
            'Inżynieria oprogramowania',
            'Obliczenia w chmurze',
            'Handel elektroniczny'
        ])->map(function ($name) {
            return Category::create(['name' => $name]);
        });

        // Create tags
        $tags = collect(['Nauka', 'Potrzebna pomoc'])->map(function ($name) {
            return Tag::create(['name' => $name]);
        });

        // Create posts
        $posts = [];
        foreach ($users as $user) {
            $posts[] = $user->posts()->createMany([
                ['title' => 'Post 1', 'content' => 'Content of Post 1'],
                ['title' => 'Post 2', 'content' => 'Content of Post 2'],
                ['title' => 'Post 3', 'content' => 'Content of Post 3'],
            ]);
        }

        // Attach categories and tags to posts
        foreach ($posts as $postCollection) {
            foreach ($postCollection as $post) {
                $post->categories()->attach($categories->random()->id);
                $post->tags()->attach($tags->random()->id);

                // Create comments for each post
                for ($i = 0; $i < 2; $i++) {
                    Comment::create([
                        'content' => "Comment $i on {$post->title}",
                        'user_id' => $users->random()->id,
                        'post_id' => $post->id,
                    ]);
                }
            }
        }
    }
}