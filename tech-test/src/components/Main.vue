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
								v-model="input.name !== 'git_profile' ? submittedData[input.name] : github.searchTerm"  
								:name="input.name" 
								:type="input.type" 
								:required="input.required" 
								class="form-control" 
								:placeholder="input.label" 
								:pattern="input.pattern" /> 
						</b-input-group>						

						<div id="githubResults" v-for="input in page" 
							v-if="input.name === 'git_profile'">
							<div v-for="result in github.response" class="row github-hit" @click="saveGithubProfile(result.id, result.html_url)"
								:class="github.selectedId === result.id ? 'selected' : ''">
								<b-col sm="2">
									<img class="github-avatar" :src="result.avatar_url"/>
								</b-col>
								<b-col sm="10">
									<div class="login-name">{{ result.login }}</div>
									<div class="html-url">{{ result.html_url }}</div>
								</b-col>
							</div>			
							<div class="searchMessage" v-if="github.response.length === 0 && github.searching === false">
								<span v-if="github.response.length === 0 && github.searchTerm === ''">
									Please use the search box to find your profile by typing in your username
								</span>
								<span v-if="github.response.length === 0 && github.searchTerm !== ''">
									Unfortunately, the username specified did not return any results
								</span>
							</div>			
							<div class="please-wait" v-show="github.searching === true" :transition="fade">
								<i class="rotate fas fa-spinner"></i>
								<br/>
								<span>SEARCHING</span>
							</div>
						</div>
						<button v-show="github.selectedId !== null || formFields[index][0].name !== 'git_profile'" type="submit" class="btn btn-success next-button">
							<i class="fas fa-chevron-right"></i>
						</button>
						<button v-show="index !== 0" @click.prevent="prevPage()" class="btn btn-info prev-button">
							<i class="fas fa-chevron-left"></i>
						</button>
						
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
					about_you: ""					
				},
				github: {
					searchTerm: '',	
					response: {},
					apiProtect: null,
					selectedId: null,
					searching: false
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
    			clearTimeout(this.github.apiProtect)
    			if (this.github.searchTerm !== "") {
    				this.github.searching = true	
    			} else {
    				this.github.searching = false	
    			}
    			self.github.response = []
       			this.github.apiProtect = setTimeout(function() {    				
    				axios.get('https://api.github.com/search/users?q=' + self.github.searchTerm)
    					.then(response => {    						
    						self.github.response = response.data.items
    						self.github.searching = false    						
    					})
    			}, 1000)   			
    		},
    		saveGithubProfile(id, url) {
    			this.github.selectedId = id
    			this.submittedData.git_profile = url
    		}
		},
		module: {
		    loaders: [
		      	{
		        	test: /\.vue$/,
		        	loader: 'vue'
		      	}, 
		      	{
		        	test: /\.s[a|c]ss$/,
		          	loader: 'style!css!sass'
		      	}
		    ]
		},
		vue: {
		    loaders: {
			    scss: 'style!css!sass'
		    }
		}
	}
</script>

<style scoped>
	
	.searchMessage {
		padding: 20px;
	}
	@keyframes spin {
		from {transform: rotate(0deg);}
		to {transform: rotate(360deg);}
	}
	i.rotate {
		font-size: 30px;
		animation-name: spin;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	.please-wait {
		background-color: rgba(0,0,0,0.4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		flex-direction: column;
	}
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
		transition-delay: 0.3s;
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
		transition: background-color 0.2s ease-out;
	}
	.github-hit:hover {
		background-color: #eee;
	}
	#githubResults {
		overflow-y: scroll;
		overflow-x: hidden;
		height: calc(100% - 140px);
		margin-top: 20px;
		border: solid 2px grey;
	}
	.github-hit.selected {
		color: white;
		background-color: green;
	}
</style>