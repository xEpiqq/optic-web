<script>
  // Add any script logic here if needed
</script>

<div class="flex min-h-screen items-start bg-black px-4 py-12 sm:px-6 lg:px-8 justify-center">
  <div class="w-full max-w-sm space-y-10 mt-44">
    <div>
      <img class="mx-auto h-10 w-auto animate-pulse animate-[pulse_3s_ease-in-out_infinite]" src="/logo.png" alt="Optic D2D Logo">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in Optic Admin</h2>
    </div>
    <form class="space-y-6" action="#" method="POST">
      <div class="relative rounded-md shadow-sm">
        <div class="border border-gray-600 rounded-t-md focus-within:ring-2 focus-within:ring-white">
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="block w-full rounded-t-md bg-black border-none py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-800 sm:text-sm sm:leading-6" placeholder="Email address">
        </div>
        <div class="border border-gray-600 rounded-b-md focus-within:ring-2 focus-within:ring-white">
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-b-md bg-black border-none py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-800 sm:text-sm sm:leading-6" placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-600 bg-black text-white focus:ring-white">
          <label for="remember-me" class="ml-2 block text-sm text-white">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-white hover:text-gray-300">Forgot password?</a>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md border border-gray-600 bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white">Sign in</button>
      </div>
    </form>
  </div>
</div>
