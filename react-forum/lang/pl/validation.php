<?php

return array(
	"accepted"             => ":attribute musi zostać zaakceptowane.", //yes, 1, true
	"active_url"           => ":attribute nie jest prawidłowym adresem URL.",
	"after"                => ":attribute musi być datą późniejszą niż :date.",
	"alpha"                => ":attribute może zawierać tylko litery.",
	"alpha_dash"           => ":attribute może zawierać tylko litery, cyfry i podkreślenia.",
	"alpha_num"            => ":attribute może zawierać tylko litery i cyfry.",
	"array"                => ":attribute musi być tablicą.",
	"before"               => ":attribute musi być datą wcześniejszą niż :date.",
	"between"              => array(
		"numeric" => ":attribute musi być wartością pomiędzy :min i :max.",
		"file"    => ":attribute musi mieć pomiędzy :min a :max kilobajtów.",
		"string"  => ":attribute musi mieć pomiędzy :min a :max znaków.",
		"array"   => ":attribute musi mieć pomiędzy :min a :max pozycji.",
	),
	"boolean"              => "Pole :attribute musi być true lub false",
	"confirmed"            => "Pola :attribute nie są takie same.",
	'current_password' 		 => 'Hasło jest niepoprawne.',
	"date"                 => "Pole :attribute nie jest prawidłową datą.",
	"date_format"          => "Pole :attribute nie zgadza się z formatem :format.",
	"different"            => "Pole :attribute i :other muszą być różne.",
	"digits"               => "Pole :attribute musi mieć :digits cyfr.",
	"digits_between"       => "Pole :attribute musi mieć pomiędzy :min a :max cyfr.",
	"email"                => "Pole :attribute must be a valid email address.",
	"exists"               => "Wybrany :attribute jest nieprawidłowy.",
	"image"                => "Pole :attribute musi być obrazkiem.",
	"in"                   => "Pole Wybrany :attribute jest nieprawidłowy.",
	"integer"              => "Pole :attribute musi być liczbą.",
	"ip"                   => "Pole :attribute musi być poprawnym adresem IP.",
	"max"                  => array(
		"numeric" => "Pole :attribute nie może być większy niż :max.",
		"file"    => "Pole :attribute nie może być większy niż :max kilobajtów.",
		"string"  => "Pole :attribute nie może być dłuższy niż :max znaków.",
		"array"   => "Pole :attribute nie może mieć więcej niż :max pozycji.",
	),
	"mimes"                => ":attribute musi być plikiem typu: :values.",
	"min"                  => array(
		"numeric" => "Pole :attribute musi większy lub równy :min.",
		"file"    => "Pole :attribute musi mieć co najmniej :min kilobajtów.",
		"string"  => "Pole :attribute musi mieć co najmniej :min znaków.",
		"array"   => "Pole :attribute musi mieć co najmniej :min pozycji.",
	),
	"not_in"               => "Wybrany :attribute jest nieprawidłowy.",
	"numeric"              => "Pole :attribute musi być numerem.",
	"regex"                => "format :attribute jest nieprawidłowy",
	"required"             => "Pole :attribute jest wymagane.",
	"required_if"          => "Pole :attribute jest wymagane, gdy :other ma wartość :value.",
	"required_with"        => "Pole :attribute jest wymagane, gdy :values są zdefiniowane.",
	"required_with_all"    => "Pole :attribute jest wymagane, gdy :values są zdefiniowane.",
	"required_without"     => "Pole :attribute jest wymagane, gdy :values nie są zdefiniowane.",
	"required_without_all" => "Pole :attribute jest wymagane, gdy żadne z :values nie są zdefiniowane.",
	"same"                 => ":attribute i :other muszą być takie same.",
	"size"                 => array(
		"numeric" => ":attribute must be :size.",
		"file"    => ":attribute musi mieć :size kilobajtów.",
		"string"  => ":attribute musi mieć :size znaków.",
		"array"   => ":attribute musi zawierać :size pozycji.",
	),
	"unique"               => ":attribute jest już zajęty.",
	"url"                  => "Format :attribute jest nieprawidłowy.",
	"timezone"             => ":attribute musi być prawidłową strefą czasową.",

	/*
	|--------------------------------------------------------------------------
	| Custom Validation Language Lines
	|--------------------------------------------------------------------------
	|
	| Here you may specify custom validation messages for attributes using the
	| convention "attribute.rule" to name the lines. This makes it quick to
	| specify a specific custom language line for a given attribute rule.
	|
	*/

	'custom' => array(
		'attribute-name' => array(
			'rule-name' => 'custom-message',
		),
	),

	/*
	|--------------------------------------------------------------------------
	| Custom Validation Attributes
	|--------------------------------------------------------------------------
	|
	| following language lines are used to swap attribute place-holders
	| with something more reader friendly such as E-Mail Address instead
	| of "email". This simply helps us make messages a little cleaner.
	|
	*/

	'attributes' => array(
		'username' => 'Nazwa użytkownika'
	),

);
