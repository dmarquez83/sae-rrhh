<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class RedirectIfAuthenticated {


	protected $auth;


	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
	}


	public function handle($request, Closure $next)
	{

		if ($this->auth->check())
		{
			return new RedirectResponse(url('/dashboard'));
		}

		return $next($request);
	}

}
