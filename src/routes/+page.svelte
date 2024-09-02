<script>
    // Add any script logic here if needed
  </script>
  
  <div class="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <form class="space-y-6" action="#" method="POST">
        <div class="relative rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="block w-full rounded-t-md border-gray-300 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-b-md border-gray-300 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6" placeholder="Password">
          </div>
        </div>
  
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
  
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">Sign in</button>
        </div>
      </form>
  
      <p class="text-center text-sm text-gray-500">
        Not a member? <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14-day free trial</a>
      </p>
    </div>
  </div>
  