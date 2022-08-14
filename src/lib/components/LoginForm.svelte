<script>
	import { goto } from '$app/navigation';
	import {
		getAuth,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword
	} from 'firebase/auth';

	export let title;
	let email, password;

	const auth = getAuth();

	const login = () => {
		if (title == 'Login') {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					localStorage.setItem('uid', user.uid);
					goto('/');
				})
				.catch((error) => {
					alert(error);
				});
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					localStorage.setItem('uid', user.uid);
					goto('/');
				})
				.catch((error) => {
					alert(error);
				});
		}
	};
</script>

<form action="POST" on:submit|preventDefault={login}>
	<div class="form-control">
		<input bind:value={email} type="email" />
		<label for="email">Email</label>
	</div>
	<div class="form-control">
		<input bind:value={password} type="password" />
		<label for="Password">Password</label>
	</div>
	{#if title == 'Login'}
		<p class="signup">Not a user?<a href="/signup">Sign Up</a></p>
		<button>Sign In</button>
	{:else}
		<p class="signup">Already a user?<a href="/signin">Sign In</a></p>
		<button>Sign Up</button>
	{/if}
</form>

<style>
	form {
		padding: 1em;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		width: max-content;
		margin: auto;
	}
	form .form-control {
		margin-bottom: 1em;
		display: flex;
		flex-direction: column;
		position: relative;
		width: 14em;
	}
	form .form-control label {
		font-size: 0.6em;
		position: absolute;
		top: 50%;
		left: 0.6em;
		transform: translateY(-50%);
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content;
		background-color: white;
		transition: all 0.5s;
		padding: 0 0.3em;
		font-weight: 500;
		pointer-events: none;
	}

	form .form-control input[type='email'],
	form .form-control input[type='password'] {
		border: 0;
		padding: 0.7em 0.5em;
		border: 1px solid rgba(0, 0, 0, 0.1);
		transition: all 0.5s;
		border-radius: 0.5em;
	}

	form .form-control input[type='email']:focus,
	form .form-control input[type='password']:focus {
		outline: none;
		border: 1px solid #b0d7ff;
	}

	form .form-control input[type='email']:focus ~ label,
	form .form-control input[type='password']:focus ~ label {
		top: -4%;
	}
	form button {
		width: 100%;
		border: 0;
		padding: 0.7em;
		cursor: pointer;
		background-color: #202020;
		color: white;
		border-radius: 0.5em;
		margin-bottom: 1em;
	}
	p.signup {
		color: #202020;
	}
	p.signup a {
		color: red;
	}
</style>
