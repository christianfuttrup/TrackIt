<script lang="ts">
	import "./app.css";

	import { derived } from "svelte/store";
	import { sponsors, type Sponsor } from "./lib/stores";

	let sponsorInput: string = "";

	function addSponsor(event: Event) {
		event.preventDefault();

		sponsors.update((sponsors: Sponsor[]) => [
			...sponsors,
			{ name: sponsorInput, time: 0 },
		]);

		sponsorInput = "";
	}

	function updateSponsor(sponsor: Sponsor, event: Event) {
		// Update the sponsor time for the specific sponsor
		sponsors.update((sponsors: Sponsor[]) => {
			// Update the time for the specfic sponsor edited by the user in the input
			const s = sponsors.find((s: Sponsor) => s.name === sponsor.name);

			if (s) {
				// Update the time for the specific sponsor
				s.time = parseFloat((event.target as HTMLInputElement).value);
			}

			return sponsors;
		});
	}

	// Calculate the total time of all sponsors
	const totalTime = derived(sponsors, ($sponsors) => {
		return $sponsors.reduce((total, sponsor) => {
			const totalTime = total + sponsor.time;

			if (isNaN(totalTime)) {
				return 0;
			}

			return total + sponsor.time;
		}, 0);
	});
</script>

<div class="p-10">
	<h1 class="font-bold text-4xl">Sponsors</h1>

	<div class="my-5">
		<form class="flex gap-2" on:submit={(event) => addSponsor(event)}>
			<div class="flex-1">
				<label for="sponsor" class="label text-sm font-bold">Sponsor</label>
				<input
					id="sponsor"
					bind:value={sponsorInput}
					type="text"
					class="input input-bordered w-full"
					placeholder="Enter sponsor"
				/>
			</div>
			<div>
				<label for="time" class="label text-sm font-bold">Time</label>
				<input
					type="number"
					class="input input-bordered w-20 text-right"
					placeholder="Total time"
					bind:value={$totalTime}
					step="0.25"
				/>
				<input class="btn" type="submit" value="Add sponsor" />
			</div>
		</form>
	</div>

	<table class="table w-full rounded-md">
		<thead>
			<tr>
				<th>Name</th>
				<th class="text-right">Time</th>
			</tr>
		</thead>
		<tbody>
			{#each $sponsors as sponsor, index}
				<tr>
					<td>{sponsor.name}</td>
					<td class="text-right">
						<input
							on:input={(event) => updateSponsor(sponsor, event)}
							class="input input-bordered w-1/4 text-right"
							type="number"
							value={sponsor.time}
							step="0.25"
						/>
					</td>
				</tr>
			{/each}
			<tr class="bg-base-200">
				<td class="font-bold">Total time</td>
				<td class="text-right">
					<input
						type="text"
						class="input input-bordered w-1/4 text-right"
						placeholder="Total time"
						bind:value={$totalTime}
					/>
				</td>
			</tr>
		</tbody>
	</table>
</div>
