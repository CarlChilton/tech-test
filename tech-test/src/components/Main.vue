<template>
	<section>
        <b-container>      
          	<b-row>
				<div class="form-container">
					<form 
						@submit.prevent="nextPage()" v-for="(page, index) in formFields" :class="pagePosition(index)" class="page">

						<b-input-group v-for="input in page">
							<input 
								@keyup="input.name === 'git_profile' ? searchGithub($event) : ''" 
								v-model="submittedData[input.name]" 
								:name="input.name" 
								:type="input.type" 
								:required="input.required" 
								class="form-control" 
								:placeholder="input.label" 
								:pattern="input.pattern" /> 
						</b-input-group>						

						<div id="githubResults" v-for="input in page" v-if="input.name === 'git_profile'">
							<div v-for="result in githubResponse" class="row github-hit">
								<b-col sm="2">
									<img class="github-avatar" :src="result.avatar_url"/>
								</b-col>
								<b-col sm="10">
									<div class="login-name">{{ result.login }}</div>
									<div class="html-url">{{ result.html_url }}</div>
								</b-col>
							</div>						
						</div>
				
						
						<button v-show="index !== 0" @click.prevent="prevPage()" class="btn btn-info prev-button">Back</button>
						<button type="submit" class="btn btn-success next-button">Next</button>
					</form>					
				</div>
				<br/>
				
          	</b-row>
        </b-container>  
    </section>
</template>

<script>
	import formFields from "@/data/form-fields"
	import axios from "axios"

	export default {
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
					about_you: "",
				},
				apiProtect: null,
				githubResponse: {}
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
      			if (this.currentPage < formFields.length - 1) {
      				this.currentPage++	
      			}    
    		},
    		prevPage() {
      			if (this.currentPage !== 0) {
        			this.currentPage--
      			}   
    		},
    		searchGithub(searchTerm) {
    			var self = this
    			clearTimeout(this.apiProtect)
    			self.githubResponse = []
       			this.apiProtect = setTimeout(function() {    				
    				axios.get('https://api.github.com/search/users?q=' + searchTerm.target.value)
    					.then(response => {    						
    						self.githubResponse = response.data.items
    						console.log(self.githubResponse)
    					})
    			}, 2000)
   			
    		}
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

	.github-avatar {
		width: 100%;
		border-radius: 50%;
		box-shadow: 1px 1px 2px rgba(0,0,0,0.4);
	}

	.login-name {
		text-align: left;
		font-weight: bold;
	}
	.html-url {
		font-size: 12px;
		text-align: left;
	}
	.github-hit {
		padding: 10px;
		border-bottom: solid 1px lightgrey;
		cursor: pointer;
		transition: background-color 0.4s ease-out;
	}
	.github-hit:hover {
		background-color: lightblue;
	}
	#githubResults {
		overflow-y: scroll;
		overflow-x: hidden;
		height: calc(100% - 140px);
		margin-top: 20px;
		border: solid 2px grey;
	}
</style>