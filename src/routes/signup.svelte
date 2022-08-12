<script>
	import LoginForm from '../lib/components/LoginForm.svelte';
	let title = 'Sign Up';
</script>

<h1>{title}</h1>
<LoginForm {title} />

<style>
	h1 {
		margin-bottom: 1em;
	}
</style>
