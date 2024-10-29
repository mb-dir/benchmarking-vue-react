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
            'Handel elektroniczny',
        ])->map(function ($name) {
            return Category::create(['name' => $name]);
        });

        // Create tags
        $tags = collect([
            'Nauka',
            'Potrzebna pomoc',
            'Edukacja',
            'Programowanie',
            'PHP',
            'Laravel',
            'JavaScript',
            'Tworzenie stron',
            'Backend',
            'Frontend',
            'Bazy danych',
            'API',
            'Kodowanie',
            'Technologia',
        ])->map(function ($name) {
            return Tag::create(['name' => $name]);
        });

        // Create posts
        $posts = [];
        foreach ($users as $user) {
            $posts[] = $user->posts()->createMany([
                ['title' => 'Jak mogę zachować stan pomiędzy renderowaniami w komponentach funkcyjnych React?', 'content' => 'Używam komponentów funkcyjnych w React z hookiem useState, ale mam problem z utrzymaniem stanu przy ponownym renderowaniu komponentu. Na przykład, gdy pobieram dane i zapisuję je w zmiennej stanu, czasami stan ten nieoczekiwanie się resetuje'],
                ['title' => 'Jak rozwiązać problem CORS przy połączeniu z API w JavaScript?', 'content' => 'Próbuję połączyć się z zewnętrznym API za pomocą fetch w mojej aplikacji JavaScript, ale ciągle otrzymuję błąd CORS (Cross-Origin Resource Sharing)'],
                ['title' => 'Jaka jest różnica między == a === w JavaScript', 'content' => 'Nie rozumiem różnicy między operatorem == a === w JavaScript. Przykładowo, kiedy używam ==, porównanie daje wynik prawdziwy, ale gdy używam ===, wynik jest fałszywy.'],
            ]);
        }

        // Attach categories and tags to posts
        foreach ($posts as $postCollection) {
            foreach ($postCollection as $post) {
                $post->categories()->attach($categories->random()->id);
                $post->tags()->attach($tags->random()->id);

                // Create comments for each post
                for ($i = 1; $i <= 2; $i++) {
                    Comment::create([
                        'content' => "Komentarz $i do pytania: {$post->title}",
                        'user_id' => $users->random()->id,
                        'post_id' => $post->id,
                    ]);
                }
            }
        }
    }
}