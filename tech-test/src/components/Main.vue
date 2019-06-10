<template>
	<section>
        <b-container>      
          	<b-row>
				<div class="form-container">
					<form 
						@submit.prevent="nextPage()" v-for="(page, index) in formFields" :class="pagePosition(index)" class="page">

						<b-input-group v-if="input.name !== 'git_profile'" v-for="input in page">
							<input v-model="submittedData[input.name]" :name="input.name" :type="input.type" :required="input.required" class="form-control" :placeholder="input.label" :pattern="input.pattern" /> 
						</b-input-group>

						

						<button @click.prevent="prevPage()" class="btn btn-info prev-button">Back</button>
						<button type="submit" class="btn btn-success next-button">Next</button>			

						

					</form>

				</div>
          	</b-row>
        </b-container>  
    </section>
</template>

<script>
	import formFields from "@/data/form-fields"
	export default {
		props: {
			
		},
		data() {
			return {
				formFields,
				currentPage: 0,
				submittedData: {
					first_name: "",
					last_name: "",
					email: "",
					phone_number: "",
					live_in_uk: false,
					git_profile: "",
					cv: "",
					cover_letter: "",
					about_you: ""	
				}
			}
		},	 
 		methods: {
 			pagePosition(index) {
 				let pageClass = ''
				if(index === this.currentPage) {
					pageClass = 'active'
				} else if (index < this.currentPage) {
					pageClass = 'prev' 
				} else if (index > this.currentPage) {
					pageClass = 'next'
				}
				return pageClass
 			},
    		nextPage() {
    			console.log(this.submittedData)
      			if (this.currentPage < formFields.length - 1) {
      				this.currentPage++	
      			}    
    		},
    		prevPage() {
      			if (this.currentPage !== 0) {
        			this.currentPage--
      			}   
    		},
    		
		}
	}
</script>

<style scoped>
	
	.form-container {
		border: solid 2px grey;
		border-radius: 10px;
		position: relative;
		height: 60vh;
		width: 100%;
		overflow: hidden;
		max-width: 500px;
		margin: 0 auto;
		
	}
	.form-container .page {
		margin: 15px;
		position: absolute;
		width: calc(100% - 30px);
		height: 100%;
		top: 0;
		transition: left 0.6s ease-out, opacity 0.3s linear;
	}
	.form-container .page.prev {
		left: -100%;
		opacity: 0;
	}
	.form-container .page.next {
		left: 100%;
		opacity: 0;
	}
	.form-container .page.active {
		left: 0;
		opacity: 1;
	}
	.form-container .buttons-container {
		padding: 0 15px;
		position: absolute;
		width: 100%;
		bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.form-container .prev-button {
		position: absolute;
		left: 0;
		bottom: 25px;
		z-index: 1;
	}
	.form-container .next-button {
		position: absolute;
		right: 0;
		bottom: 25px;
		z-index: 1;
	}
</style>