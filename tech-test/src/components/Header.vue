<template>
	<div id="header-container">
		<div class="logo-container">
			<img src="@/assets/images/netsells-logo.png"/>
		</div>
		<div class="title-container">
			<span class="description">Technical Test</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	
	#header-container {
		padding: 0 20px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #285984;
		.logo-container {
			img {
				width: 150px;
			}
		}
		.title-container {
			color: white;
			font-weight: bold;
		}
		br.title-break {
			display: none;
		}
	}

</style>