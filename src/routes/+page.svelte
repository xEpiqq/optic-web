<script>
  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<div class="bg-zinc-900 min-h-screen flex flex-col">
  <header class="relative inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="/logo.png" alt="">
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
            <img class="h-8 w-auto" src="/logo.png" alt="">
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

  <div class="relative isolate px-6 lg:px-8 flex-grow flex flex-col justify-start">
    <div class="mx-auto max-w-2xl pt-32 sm:pt-36 lg:pt-44">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-400 ring-1 ring-zinc-500/10 hover:ring-zinc-500/20">
          Go To Optic Admin <a href="/auth" class="font-semibold text-indigo-400"><span class="absolute inset-0" aria-hidden="true"></span>Log in </a>
        </div>
      </div>
      <div class="text-center">
        <h2 class="text-3xl font-bold text-indigo-400 mb-2">Optic D2D</h2>
        <h1 class="text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl">Sell Fiber Faster</h1>
        <p class="mt-6 text-lg leading-8 text-zinc-300">Import leads, knock doors, sign up customers, increase your revenue.</p>
        <div class="mt-10 flex flex-col items-center justify-center">
          <a href="/auth" class="rounded-md bg-indigo-600 px-8 py-3 text-base font-semibold text-zinc-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Get started</a>
          <p class="mt-4 text-sm text-zinc-400 italic">Early Access Version</p>
        </div>
      </div>
    </div>
  </div>
</div>