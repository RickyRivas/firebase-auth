<script>
	import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';

	const bytesToSize = (bytes) => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return 'n/a';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
		if (i === 0) return `${bytes} ${sizes[i]})`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	};

	const storage = getStorage();

	const downloadFile = (folder, name) => {
		const uid = localStorage.getItem('uid');
		let path = `${uid}/${folder}/${name}`;
		getDownloadURL(ref(storage, path))
			.then((url) => {
				const link = document.createElement('a');
				link.href = url;
				link.click();
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const deleteFile = (folder, name) => {
		const uid = localStorage.getItem('uid');
		let path = `${uid}/${folder}/${name}`;
		const fileRef = ref(storage, path);

		window.confirm('Permanently delete this file?');
		deleteObject(fileRef)
			.then(() => {
				functionProp();
			})
			.catch((e) => {
				console.error(e);
			});
	};

	export let data;
	export let folder;
	export let functionProp = () => {};
</script>

<section>
	{#each data as { name, timeCreated, size }}
		<h3>{name}</h3>
		<p>{timeCreated}</p>
		<p>{bytesToSize(size)}</p>
		<div>
			<button on:click={() => downloadFile(folder, name)}>Download</button>
			<button on:click={() => deleteFile(folder, name)}>Delete</button>
		</div>
	{/each}
</section>
