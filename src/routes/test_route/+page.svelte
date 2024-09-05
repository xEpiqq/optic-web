<script>
	export let data;
	const teams = data.teams
</script>

<ul>
	{#each teams as team (team.id)}
		<li class="font-bold text-red-900">{team.name}</li>
	{/each}
</ul>