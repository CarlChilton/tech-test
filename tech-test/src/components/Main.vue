<template>
	<section>
        <b-container>      
          	<b-row>
				<div class="form-container">
					<form 
						@submit.prevent="nextPage()" v-for="(page, index) in formFields" :class="pagePosition(index)" class="page">						
						<div class="page-title">{{ page.title }}</div>
						<div class="page-description">{{ page.description }}</div>

						<b-input-group v-for="input in page.data">
							<input 
								v-show="page.name !== 'summary'"
								@keyup="page.name === 'git_profile' ? searchGithub($event) : ''" 
								v-model="submittedData[input.name]"  
								:name="input.name" 
								:type="input.type" 
								:required="input.required" 
								class="form-control tech-input" 
								:placeholder="input.label" 
								:pattern="input.pattern"
								:title="input.title" /> 	
							<div v-show="page.name === 'summary'">
								<div>Name: {{ submittedData.first_name }} {{ submittedData.last_name }}</div>
								<div>Email: {{ submittedData.email }}</div>
								<div>Phone: {{ submittedData.phone_number }}</div>
								<div>Live in the uk: {{ submittedData.live_in_uk }}</div>
								<div>Git Profile: {{ submittedData.git_profile }}</div>
								<div>CV attached: {{ submittedData.cv }}</div>
								<div>Cover letter attached: {{ submittedData.cover_letter }}</div>
								<div>About you: {{ submittedData.about_you }}</div>
							</div>					
						</b-input-group>		
						
						<div id="githubResults" v-if="page.name === 'git_profile'">
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
							<div class="searchMessage" v-show="github.searching === false && github.showValidationError === false">
								<span v-if="github.response.length === 0 && github.searchTerm !== ''">
									Unfortunately, the username specified did not return any results
								</span>
								<span v-else-if="github.searchTerm === ''">
									Please use the search box to find your profile by typing in your username	
								</span>
																
							</div>			
							<div class="please-wait" v-show="github.searching === true">
								<i class="rotate fas fa-spinner"></i>
								<br/>
								<span>SEARCHING</span>
							</div>
							<div id="githubValidationError" v-show="github.showValidationError">
								<span>Please use the search box above to find your username and select your profile to continue</span>
								<input type="button" value="OK" @click="github.showValidationError = false"/>
							</div>
						</div>	

						<button type="submit" class="btn btn-success next-button" @click="page.name === 'summary' ? submitData() : ''">
							<i v-if="page.name !== 'summary'" class="fas fa-chevron-right"></i>
							<div v-else>FINISH</div>
						</button>
						<button v-show="index !== 0" @click.prevent="prevPage()" class="btn btn-info prev-button">
							<i class="fas fa-chevron-left"></i>
						</button>		

					</form>			
					<div id="final" v-show="finished">
						<div class="finalMessage" v-show="finalise.dataSending">
							<i class="rotate fas fa-spinner"></i>
							<span>THANK YOU!</span>						
							<span>Please wait while your information is submitted</span>
						</div>
						<div class="finalMessage" v-show="finalise.dataSubmitted">
							<span>{{ response.message }}</span>
							<span>{{ response.description }}</span>
						</div>
					</div>
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
			dataReady: false,
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
				searching: false,
				showValidationError: false
			},		
			finished: false	,
			finalise: {
				dataSending: false,
				dataSubmitted: false
			},
			response: {
				message: '',
				description: ''
			}
		}
	},		
	mounted() {
		this.dataReady = true
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
			if (this.github.selectedId === null && formFields[this.currentPage].name === 'git_profile') {
				this.github.showValidationError = true
			} else if (this.currentPage < formFields.length - 1) {
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
			this.github.showValidationError = false
			this.github.searchTerm = searchTerm.target.value 
			if (searchTerm.target.value !== "") {
				this.github.searching = true	
			} else {
				this.github.searching = false	
			}
			self.github.response = []
			this.github.apiProtect = setTimeout(function() {    				
			axios.get('https://api.github.com/search/users?q=' + searchTerm.target.value)
				.then(response => {    						
					self.github.response = response.data.items
					self.github.searching = false    						
				})
			}, 1000)   			
		},
		saveGithubProfile(id, url) {
			this.github.selectedId = id
			this.submittedData.git_profile = url
		},
	
		submitData() {
			this.finished = true
			this.finalise.dataSending = true
			
		}
	}
}
</script>

<style scoped>
	
	#final {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 3;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255,255,255,0.7);
	}
	.finalMessage {
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
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
	.please-wait, #githubValidationError {
		background-color: rgba(0,0,0,0.4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		flex-direction: column;
	}
	#githubValidationError {
		z-index: 3;
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