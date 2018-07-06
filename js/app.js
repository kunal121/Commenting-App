//Comment class is used to define all the property of comment
// And the functionality they are performing
class Comment {
	constructor(author, content, timestamp, height = 0) {
		this.author = author
		this.content = content
		this.comments = []
		this.vote = 0
		this.height = height
		this.$badge = null
		this.created = timestamp
	}

	upvote() {
		this.vote = this.vote + 1
		this.$badge.innerHTML = this.vote
	}

	downvote() {
		if (this.vote != 0) {
			this.vote = this.vote - 1
			this.$badge.innerHTML = this.vote
		}
	}

	replies(event) {
		let parent = event.currentTarget.parentNode.parentNode.parentNode;
		show()
		showModel(parent, 1)
	}
// This function is used to generate the whole code for a comment and to append it at the right
//place.
	addComment(listGroup, flag) {
		this.$comment = document.createElement('div')
		this.$comment.className = 'list-group-item'
		this.li = `
    <div>
      <div class="inline-block">
       <div class="list-group-item-text">${this.content}</div>
       <div class="list-group-item-text big-bold">--${this.author}</div>
      </div>
      <div class="pull-right timestamp inline-block">${this.created}</div>
    </div>
    <div class="comment-box">
       <div class="btn-group btn-group-sm pull-right tool-box"><button type="button" class="btn btn-default share">
       <span class="glyphicon glyphicon-share-alt"></span>
       <div class="btn-group btn-group-sm pull-right"><button type="button" class="btn btn-default upvote">
       <span class="glyphicon glyphicon-chevron-up"></span></button><button class="btn btn-default but">
       <span class="badge score-sm"></span></button><button type="button" class="btn btn-default downvote">
       <span class="glyphicon glyphicon-chevron-down"></span></button></div>
    </div>
    <div class="row replies">

    <hr class="line"></hr>
    </div>
    `
		this.$comment.innerHTML = this.li
		this.$shareButton = this.$comment.querySelector('.share')
		this.$shareButton.addEventListener('click', (e) => {
			this.replies(e)
		})
		this.$upvoteButton = this.$comment.querySelector('.upvote')
		this.$upvoteButton.addEventListener('click', () => this.upvote())
		this.$downvoteButton = this.$comment.querySelector('.downvote')
		this.$downvoteButton.addEventListener('click', () => this.downvote())
		this.$badge = this.$comment.querySelector('.badge')
		this.$badge.innerHTML = this.vote
		console.log(listGroup.childNodes[0])
		if (flag == 0) {
			console.log(this.$comment)
			this.$comment.style.marginTop = "40px";
			listGroup.insertBefore(this.$comment, listGroup.childNodes[1]);
		} else {
			listGroup.append(this.$comment);
		}
	}
}


// Wrapper class helps intiating the structure of code.
class Wrapper {
	constructor() {
		this.$form = document.querySelector('#myform')
		this.$suggestion = document.querySelector('#suggestionButton')
		this.$suggestion.addEventListener('click', (function (parent) {
			return function () {
				show()
				showModel(parent)
			}
		})(this))
		this.comments = [] //Array to store all the object of the main comments
	}
}

//To display the modal
function show() {
	let $submission = document.querySelector('#formdiv')
	$submission.style.display = 'block'
}

//To hide the modal
function hide() {
  document.querySelector('.author').value=""
  document.querySelector('.content').value=""
	let $submission = document.querySelector('#formdiv')
	$submission.style.display = 'none'
}

//Generating Timestamp
function date() {
	let currentdate = new Date();
	let hours = currentdate.getHours()
	let minute = currentdate.getMinutes()
	if (hours > 12)
		hours = hours - 12
	return hours.toString() + ":" + minute.toString()
}

/*Showmodel decides whether the addComment function is called by reply button or from
Outside create button.*/
function showModel(parent, flag = 0) {
	let $form = document.querySelector('#myform')
	let $closed = document.querySelector('.closed')
	$closed.addEventListener('click', function () {
		hide()
	})
	$form.onsubmit = function (e) {
		e.preventDefault()
		let author = document.querySelector('.author').value
		let content = document.querySelector('.content').value
		let timestamp = date()
		let comment = new Comment(author, content, timestamp)
		let $listGroup = document.querySelector('.list-group')
		console.log(parent)
		if (flag == 1) {  //checking if function is called by reply button
			comment.addComment(parent, flag)
			hide()
		} else {
			comment.addComment($listGroup, flag)
			hide()
			parent.comments.push(comment)
		}
	}
}

let wrapper = new Wrapper()
