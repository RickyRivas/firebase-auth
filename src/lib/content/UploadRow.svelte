<script>
	import Dropzone from 'dropzone';
	import { onMount } from 'svelte';
	import { getStorage, ref, uploadBytes } from 'firebase/storage';

	const storage = getStorage();

	export let folder;
	export let functionProp = () => {};

	onMount(() => {
		const user = localStorage.getItem('uid');
		const path = `${user}/${folder}`;

		let myDropzone = new Dropzone(`#my-form-${folder}`);
		myDropzone.options.disablePreviews = true;
		myDropzone.on('addedfile', (upload) => {
			let storageRef = ref(storage, `${path}/${upload.name}`);
			uploadBytes(storageRef, upload).then((snapshot) => {
				console.log('uploaded a blob or file');
				functionProp();
			});
		});
	});
</script>

<form action="/target" class="dropzone" id="my-form-{folder}" />

<style>
	.dropzone {
		width: 100%;
		height: 4em;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px dashed black;
	}
</style>
