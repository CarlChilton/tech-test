<template>
	<section>
        <b-container>      
          	<b-row>
            	<b-col sm="6" offset="3">
					<div class="form-container">
						<div v-for="(page, index) in formFields" :class="pagePosition(index)" class="page">		
							<b-input-group v-for="input in page">
								<!-- <label>{{ input.label }}</label> -->
								<input :type="input.type" class="form-control" :placeholder="input.label"/> 
							</b-input-group>				
						</div>	
						<div class="buttons-container">
							<button @click="prevPage()" class="btn btn-info">Back</button>
							<button @click="nextPage()" class="btn btn-success">Next</button>
						</div>					
					</div>					
            	</b-col>
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
				currentPage: 0
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
      			console.log(this.currentPage)      
    		},
    		prevPage() {
      			if (this.currentPage !== 0) {
        			this.currentPage--
      			}
      			console.log(this.currentPage)      
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
		overflow: hidden;
	}
	.form-container .page {
		margin: 15px;
		position: absolute;
		width: calc(100% - 30px);
		height: 100%;
		top: 0;
		transition: left 0.6s ease-out
	}
	.form-container .page.prev {
		left: -100%;
	}
	.form-container .page.next {
		left: 100%;
	}
	.form-container .page.active {
		left: 0;
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
</style>