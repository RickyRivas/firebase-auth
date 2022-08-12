<script>
	import LoginForm from '../lib/components/LoginForm.svelte';
	let title = 'Login';
</script>

<h1>Login</h1>
<LoginForm {title} />

<style>
	h1 {
		margin-bottom: 1em;
	}
</style>
