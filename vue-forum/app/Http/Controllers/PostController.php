<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(){
        $canLogin = Route::has('login');
        $canRegister = Route::has('register');
        return Inertia::render('Posts', compact('canLogin', 'canRegister'));
    }
}
