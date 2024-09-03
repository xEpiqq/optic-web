<script>
	let isMobileMenuOpen = false;
  
	function toggleMobileMenu() {
	  isMobileMenuOpen = !isMobileMenuOpen;
	}
  </script>
  
  <div class="bg-zinc-900 flex flex-col min-h-screen">
	<header class="relative inset-x-0 top-0 z-50">
	  <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
		  <a href="#" class="-m-1.5 p-1.5">
			<span class="sr-only">Your Company</span>
			<img class="h-8 w-auto" src="/logo.png" alt="Optic D2D Logo">
		  </a>
		</div>
		<div class="flex lg:hidden">
		  <button on:click={toggleMobileMenu} type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-300">
			<span class="sr-only">Open main menu</span>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
			  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		  </button>
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
		  <a href="/auth" class="text-sm font-semibold leading-6 text-zinc-300">Log in <span aria-hidden="true">&rarr;</span></a>
		</div>
	  </nav>
	  <!-- Mobile menu, show/hide based on menu open state. -->
	  {#if isMobileMenuOpen}
	  <div class="lg:hidden" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-50"></div>
		<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-zinc-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10">
		  <div class="flex items-center justify-between">
			<a href="#" class="-m-1.5 p-1.5">
			  <span class="sr-only">Your Company</span>
			  <img class="h-8 w-auto" src="/logo.png" alt="Optic D2D Logo">
			</a>
			<button on:click={toggleMobileMenu} type="button" class="-m-2.5 rounded-md p-2.5 text-zinc-300">
			  <span class="sr-only">Close menu</span>
			  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			  </svg>
			</button>
		  </div>
		  <div class="mt-6 flow-root">
			<div class="-my-6 divide-y divide-gray-500/10">
			  <div class="py-6">
				<a href="/auth" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-zinc-300 hover:bg-gray-50">Log in</a>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	  {/if}
	</header>
  
	<!-- Page content below the header -->
	<div class="flex-grow flex items-center bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8 justify-center">
	  <div class="w-full max-w-sm space-y-8">
		<div class="text-center">
		  <img class="mx-auto h-10 w-auto animate-pulse animate-[pulse_3s_ease-in-out_infinite]" src="/logo.png" alt="Optic D2D Logo">
		  <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-zinc-100">Sign in Optic Admin</h2>
		</div>
		<form class="space-y-6" action="?/login" method="POST">
		  <div class="relative">
			<input id="email-address" name="email" type="email" autocomplete="email" required class="mt-1 block w-full rounded-md bg-zinc-800 border border-gray-700 py-2 px-3 text-zinc-100 placeholder-zinc-400 focus:border-indigo-400 focus:outline-none sm:text-sm sm:leading-6" placeholder="Email address">
		  </div>
		  <div class="relative">
			<input id="password" name="password" type="password" autocomplete="current-password" required class="mt-1 block w-full rounded-md bg-zinc-800 border border-gray-700 py-2 px-3 text-zinc-100 placeholder-zinc-400 focus:border-indigo-400 focus:outline-none sm:text-sm sm:leading-6" placeholder="Password">
		  </div>
  
		  <div class="flex items-center justify-between">
			<div class="flex items-center">
			  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-700 bg-zinc-900 text-indigo-400 focus:ring-indigo-400">
			  <label for="remember-me" class="ml-2 block text-sm text-zinc-100">Remember me</label>
			</div>
			<div class="text-sm">
			  <a href="#" class="font-medium text-indigo-400 hover:text-indigo-300">Forgot password?</a>
			</div>
		  </div>
  
		  <div>
			<button type="submit" class="flex w-full justify-center rounded-md border border-gray-700 bg-indigo-600 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">Sign in</button>
		  </div>
		</form>
	  </div>
	</div>
  </div>
  