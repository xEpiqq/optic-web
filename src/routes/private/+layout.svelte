<script>
	export let data;
	let userProfile = data.userProfile
	let teams = data.userProfile.teams
	import { page } from '$app/stores';
</script>

<div class="h-full bg-white">
	<div class="h-full">
<div>
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
	  <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>
  
	  <div class="fixed inset-0 flex">
		<div class="relative mr-16 flex w-full max-w-xs flex-1">
		  <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
			<button type="button" class="-m-2.5 p-2.5">
			  <span class="sr-only">Close sidebar</span>
			  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			  </svg>
			</button>
		  </div>
  
		  <!-- Sidebar component, swap this element with another sidebar if you like -->
		  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">

			<div class="flex h-16 shrink-0 items-center">
			  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
			</div>
			<nav class="flex flex-1 flex-col">
			  <ul role="list" class="flex flex-1 flex-col gap-y-7">
				<li>
				  <ul role="list" class="-mx-2 space-y-1">
					<li>
					  <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
					  <a href="#" class="group flex gap-x-3 rounded-md bg-gray-50 p-2 text-sm font-semibold leading-6 text-indigo-600">
						<svg class="h-6 w-6 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
						</svg>
						Dashboard
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
						</svg>
						Team
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
						</svg>
						Projects
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
						</svg>
						Calendar
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
						</svg>
						Documents
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
						  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
						</svg>
						Reports
					  </a>
					</li>
				  </ul>
				</li>
				<li>
				  <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
				  <ul role="list" class="-mx-2 mt-2 space-y-1">
					<li>
					  <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">H</span>
						<span class="truncate">Heroicons</span>
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">T</span>
						<span class="truncate">Tailwind Labs</span>
					  </a>
					</li>
					<li>
					  <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
						<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">W</span>
						<span class="truncate">Workcation</span>
					  </a>
					</li>
				  </ul>
				</li>
			  </ul>
			</nav>
		  </div>
		</div>
	  </div>
	</div>
  
	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
	  <!-- Sidebar component, swap this element with another sidebar if you like -->
	  <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
		<div class="flex h-16 shrink-0 items-center">
		  <img class="h-8 w-auto" src="/invertlogo.png" alt="Your Company">
		</div>
		<div class="font-bold text-gray-600">{userProfile.orgName}</div>

		<nav class="flex flex-1 flex-col">
		  <ul role="list" class="flex flex-1 flex-col gap-y-7">
			<li>
				<ul role="list" class="-mx-2 space-y-1">
					<li>
						<a href="/private/reporting" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
						{($page.url.pathname === '/private/reporting' ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600')}">
							<svg class="h-6 w-6 shrink-0 {($page.url.pathname === '/private/reporting' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600')}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
								<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
							</svg>
							Reporting
						</a>
					</li>
				
					<li>
						<a href="/private/users" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
						{($page.url.pathname === '/private/users' ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600')}">
							<svg class="h-6 w-6 shrink-0 {($page.url.pathname === '/private/users' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600')}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
							</svg>
							Onboard Reps
						</a>
					</li>
				
					<li>
						<a href="/private/import" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
						{($page.url.pathname === '/private/import' ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600')}">
						<svg class="h-6 w-6 shrink-0 {($page.url.pathname === '/private/import' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600')}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
						</svg>
						Import Leads
					  </a>
					  
					</li>
				
					<li>
						<a href="/private/assign" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
						{($page.url.pathname === '/private/assign' ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600')}">
						<svg class="h-6 w-6 shrink-0 {($page.url.pathname === '/private/assign' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600')}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
						</svg>
						Assign Area
					  </a>
					  
					</li>
				</ul>
				
			</li>
			<li>
			  <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
			  <ul role="list" class="-mx-2 mt-2 space-y-1">
				{#each teams as team (team.id)}
				  <li>
					<a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
					  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
						{team.name.charAt(0)}
					  </span>
					  <span class="truncate">{team.name}</span>
					</a>
				  </li>
				{/each}
			  </ul>
			  
			</li>
			<li class="-mx-6 mt-auto">
			  <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
				<img class="h-8 w-8 rounded-full bg-gray-50" src={userProfile.profile_picture_url} alt="">
				<span class="sr-only">Your profile</span>
				<span aria-hidden="true">{userProfile.first_name} {userProfile.last_name}</span>
			  </a>
			</li>
		  </ul>
		</nav>
	  </div>
	</div>
  
	<div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
	  <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
		<span class="sr-only">Open sidebar</span>
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
		</svg>
	  </button>
	  <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
	  <a href="#">
		<span class="sr-only">Your profile</span>
		<img class="h-8 w-8 rounded-full bg-gray-50" src={userProfile.profile_picture_url} alt="">
	  </a>
	</div>
  
	<main class="py-10 lg:pl-72">
	  <div class="px-4 sm:px-6 lg:px-8">
		<slot/>
	</div>
	</main>
	</div>
	</div>
  </div>
  