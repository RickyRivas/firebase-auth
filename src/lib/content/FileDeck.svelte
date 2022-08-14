<script>
	import FileTable from './fileTable.svelte';
	import UploadRow from './UploadRow.svelte';
	import { getStorage, ref, getMetadata, listAll } from 'firebase/storage';
	import { onMount } from 'svelte';

	const storage = getStorage();
	const refs = ['work', 'clients', 'pictures', 'misc'];

	$: files = {
		work: [],
		clients: [],
		pictures: [],
		misc: []
	};

	const getFileData = () => {
		files = {
			work: [],
			clients: [],
			pictures: [],
			misc: []
		};

		const user = localStorage.getItem('uid');
		refs.forEach((folder) => {
			let reference = ref(storage, `${user}/${folder}`);
			listAll(reference)
				.then((res) => {
					res.items.forEach((itemRef) => {
						getMetadata(itemRef).then((metaData) => {
							files[folder] = [...files[folder], metaData];
						});
					});
				})
				.catch((e) => {
					console.log(e);
				});
		});
	};

	onMount(() => {
		let user = '';
		getFileData();
	});
</script>

<section>
	<div class="box">
		<h3>Work Files</h3>
		<UploadRow folder="work" functionProp={() => getFileData()} />
		{#if files.work.length > 0}
			<FileTable data={files.work} folder="work" functionProp={() => getFileData()} />
		{/if}
	</div>
	<div class="box">
		<h3>Client Files</h3>
		<UploadRow folder="client" functionProp={() => getFileData()} />
		{#if files.clients.length > 0}
			<FileTable data={files.clients} folder="clients" functionProp={() => getFileData()} />
		{/if}
	</div>
	<div class="box">
		<h3>Pictures Files</h3>
		<UploadRow folder="pictures" functionProp={() => getFileData()} />
		{#if files.pictures.length > 0}
			<FileTable data={files.pictures} folder="pictures" functionProp={() => getFileData()} />
		{/if}
	</div>
	<div class="box">
		<h3>Misc Files</h3>
		<UploadRow folder="misc" functionProp={() => getFileData()} />
		{#if files.misc.length > 0}
			<FileTable data={files.misc} folder="misc" functionProp={() => getFileData()} />
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		max-width: 1200px;
		margin: auto;
	}
	.box {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 1em;
		margin-bottom: 1em;
		background-color: #f1f1f1;
	}
	h3 {
		margin-bottom: 1em;
	}
</style>
