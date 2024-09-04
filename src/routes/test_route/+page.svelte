<script>
	export let data;
	$: ({ user } = data);
</script>

<h1>Private page for user: {user?.email}</h1>
<button class="bg-red-500" on:click={() => console.log(user)}>HKH</button>
