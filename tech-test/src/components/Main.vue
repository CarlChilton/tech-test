<template>
	<section id="form-page-container">
        <b-container>      
          	<b-row>
				<div class="form-container">					
					<form 
						@submit.prevent="nextPage()" v-for="(page, index) in formFields" :class="pagePosition(index)" class="page">						
						<div class="page-title">{{ page.title }}</div>
						<div class="page-description">{{ page.description }}</div>
						
						<b-input-group v-for="input in page.data" :class="page.name === 'about-you' ? 'full-height' : ''">
							<label v-show="page.name !== 'summary'" class="input-label">{{ input.label }}</label>
							<span class="required-identifier" v-show="input.required">*</span>
							<input
								v-if="page.name !== 'about-you'" 
								v-show="page.name !== 'summary'"
								@keyup="page.name === 'git_profile' ? searchGithub($event) : ''" 
								v-model="submittedData[input.name]"  
								:name="input.name" 
								:type="input.type" 
								:required="input.required" 
								class="form-control tech-input" 
								:pattern="input.pattern"
								:title="input.title" />			
							<textarea
								v-show="page.name === 'about-you'"
								v-model="submittedData[input.name]"
								:name="input.name" 
								:required="input.required" 
								class="form-control tech-input"></textarea>					
							<div v-show="page.name === 'summary'" id="final-summary">
								<div class="summary-item">
									<span class="summary-label">Name: </span>
									<span class="summary-value">{{ submittedData.first_name }} {{ submittedData.last_name }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">Email: </span>
									<span class="summary-value">{{ submittedData.email }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">Phone: </span>
									<span class="summary-value">{{ submittedData.phone_number }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">Live in the uk: </span>
									<span class="summary-value">{{ submittedData.live_in_uk }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">Git Profile: </span>
									<span class="summary-value">{{ submittedData.git_profile }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">CV attached: </span>
									<span class="summary-value">{{ submittedData.cv }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">Cover letter attached: </span>
									<span class="summary-value">{{ submittedData.cover_letter }}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">About you: </span>
									<span class="summary-value">{{ submittedData.about_you }}</span>
								</div>
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
								<span class="validationErrorMessage">Please use the search box above to find your username and select your profile to continue</span>
								<input type="button" value="OK" @click="hideGithubMessage()"/>
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
							<br/>
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
			if (this.submittedData.git_profile === '' && formFields[this.currentPage].name === 'git_profile') {
				this.github.showValidationError = true
				this.selectedId === null
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
			let self = this
			clearTimeout(this.github.apiProtect)			
			this.github.searchTerm = searchTerm.target.value 
			if (searchTerm.target.value !== "") {
				this.github.searching = true	
				this.github.showValidationError = false
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
		hideGithubMessage() {
			this.github.showValidationError = false
			this.github.selectedId = null
		},
		saveGithubProfile(id, url) {
			this.github.selectedId = id
			this.submittedData.git_profile = url
		},
	
		submitData() {
			let self = this
			this.finished = true
			this.finalise.dataSending = true
			axios({
				method: "POST", 
				url: "https://recruitment-submissions.netsells.co.uk/api/vacancies/javascript-developer/submissions/",
				headers: {'X-Requested-With': 'XMLHttpRequest'},
				data: self.submittedData})
				.then(response => {    						
					console.log(response)   						
				})			  						
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/css/main.scss"
</style>