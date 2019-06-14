<template>
	<section id="form-page-container">
        <b-container>      
          	<b-row>
				<div class="form-container">	
				<!--Create a form for each page and utilise HTML5 form submission validation -->				
					<form 
						@submit.prevent="nextPage()" v-for="(page, index) in formFields" :class="pagePosition(index)" class="page">						
						<!--Create a title and subtitle for each page-->
						<div class="page-title">{{ page.title }}</div>
						<div class="page-description">{{ page.description }}</div>
						<!--Loop through the data and draw input boxes with their corresponding properties-->
						<b-input-group v-for="input in page.data" :class="page.name === 'about-you' ? 'full-height' : ''">
							<label v-show="page.name !== 'summary'" class="input-label">{{ input.label }}</label>
							<span class="required-identifier" v-show="input.required">*</span>
							<input
								v-if="page.name !== 'about-you'" 
								v-show="page.name !== 'summary'"
								@keyup="page.name === 'git_profile' ? searchGithub($event) : ''" 
								:class="input.name === 'cv' ? 'input-cv' : input.name === 'cover_letter' ? 'input-cover-letter' : ''"
								v-model="submittedData[input.name]"  
								:name="input.name" 
								:type="input.type" 
								:required="input.required" 
								class="form-control tech-input" 
								:pattern="input.pattern"
								:title="input.title" />	
							<!--Create a text area for the about you page-->
							<div class="remaining-characters" v-if="page.name === 'about-you'">Remaining chars: {{ remainingChars }}</div>				
							<textarea
								id="about-you-textarea"
								@keyup="countdown()"
								v-show="page.name === 'about-you'"
								v-model="submittedData[input.name]"
								:name="input.name" 
								:required="input.required" 
								class="form-control tech-input"></textarea>		
							<!--Validation popup for the textarea-->
							<div id="textareaValidationMessage" v-show="showTextareaMessage">
								<span class="validationErrorMessage">You need to have at least 100 characters in this form to continue. You have {{ remainingChars }} remaining.</span>
								<input type="button" value="OK" @click="hideTextareaMessage()"/>
							</div>
							<!--Create a final summary page before submitting the data-->			
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
						<!--Show the results of the github search-->
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
							<!--Give user feedback if a search hasn't happened or has failed-->
							<div class="searchMessage" v-show="github.searching === false && github.showValidationError === false">
								<span v-if="github.response.length === 0 && github.searchTerm !== ''">
									Unfortunately, the username specified did not return any results
								</span>
								<span v-else-if="github.searchTerm === ''">
									Please use the search box to find your profile by typing in your username	
								</span>																
							</div>			
							<!--Show activity when searching git hub-->
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
						<!--Back and next buttons on each page-->
						<button type="submit" class="btn btn-success next-button" @click="page.name === 'summary' ? submitData() : ''">
							<i v-if="page.name !== 'summary'" class="fas fa-chevron-right"></i>
							<div v-else>FINISH</div>
						</button>
						<button v-show="index !== 0" @click.prevent="prevPage()" class="btn btn-info prev-button">
							<i class="fas fa-chevron-left"></i>
						</button>		
					</form>			
					<!--Final page showing either success or failure of submission-->
					<div id="final" v-show="finished">
						<div class="finalMessage" v-show="finalise.dataSending">
							<i class="rotate fas fa-spinner"></i>
							<br/>
							<span>THANK YOU!</span>						
							<span>Please wait while your information is submitted</span>
						</div>
						<div class="finalMessage" v-show="finalise.dataSubmitted">
							<span class="response-message">{{ response.message }}</span>
							<span class="response-description">{{ response.description }}</span>
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
				cv: null,
				cover_letter: null,
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
			},
			showTextareaMessage: false,
			remainingChars: 100
		}
	},		
	mounted() {
		this.dataReady = true
	},
	methods: {
		countdown() {
			console.log(this.submittedData.about_you.length)
			if(this.remainingChars > 0) {
				this.remainingChars = 100 - this.submittedData.about_you.length
			} else {
				this.remainingChars = 0;
			}
			
		},
		pagePosition(index) {
			//dictates which page is being shown
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
			//Move onto the next page if all validation has passed
			if (this.github.selectedId === null && formFields[this.currentPage].name === 'git_profile') {
				this.github.showValidationError = true
			} else if (formFields[this.currentPage].name === 'about-you' && $("#about-you-textarea").val().length < 100) {
				console.log($("#about-you-textarea").val().length)
				this.showTextareaMessage = true
			} else if (this.currentPage < formFields.length - 1) {
				this.currentPage++	
			}    
		},
		prevPage() {
			//Move to the previous page
			if (this.currentPage !== 0) {
				this.currentPage--
			}   
		},
		searchGithub(searchTerm) {
			//Search github after 1 second of idle time from inputting
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
			//clear error messages
			this.github.showValidationError = false
			this.github.selectedId = null
		},
		hideTextareaMessage() {
			this.showTextareaMessage = false
		},
		saveGithubProfile(id, url) {
			//Store the saved github profile
			this.github.selectedId = id
			this.submittedData.git_profile = url
		},		
		submitData() {
			//Send the data to Netsells
			function b64toBlob(b64Data, contentType, sliceSize) {
		        contentType = contentType || '';
		        sliceSize = sliceSize || 512;

		        var byteCharacters = atob(b64Data);
		        var byteArrays = [];

		        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		            var slice = byteCharacters.slice(offset, offset + sliceSize);

		            var byteNumbers = new Array(slice.length);
		            for (var i = 0; i < slice.length; i++) {
		                byteNumbers[i] = slice.charCodeAt(i);
		            }
		            var byteArray = new Uint8Array(byteNumbers);
		            byteArrays.push(byteArray);
		        }
	      		var blob = new Blob(byteArrays, {type: contentType});
	      		return blob;
			}

			var dataToSend = new FormData(this.submittedData)
			
			for (let field in this.submittedData) {
				dataToSend.append(field, this.submittedData[field])
			}

			let self = this

			this.finished = true
			this.finalise.dataSending = true			

			var cv = $(".input-cv")[0]["files"][0]	
			dataToSend.append("cv", $(".input-cv")[0]["files"][0])
			dataToSend.append("cover_letter", $(".input-cover-letter")[0]["files"][0])

			$.ajax({
				type: "POST",
				url: "https://recruitment-submissions.netsells.co.uk/api/vacancies/javascript-developer/submissions",
				headers: {'X-Requested-With': 'XMLHttpRequest'},
				data: dataToSend,
				processData: false, 
				contentType: false,
				success: function(response) {
					self.finalise.dataSending = false
					self.finalise.dataSubmitted = true
					self.response.message = "Thank you"
					self.response.description = "Your details have been successfully submitted and sent over to the team"
				},
				error: function(response) {
					self.finalise.dataSending = false
					self.finalise.dataSubmitted = true
					self.response.message = "Whoops!"
					self.response.description = "Unfortunately, there was an error and the details were not submitted, please refresh the page and try again"	
				}
			})				
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/css/main.scss"
</style>