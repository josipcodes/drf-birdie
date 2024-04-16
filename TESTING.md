# Birdie | Testing

Return to [README](README.md).

## Table of Contents

### [Frontend Testing](#frontend-testing-1)

#### [Automated Testing](#automated-testing-1)

#### [Manual Testing](#manual-testing-1)

#### [Responsiveness Testing](#responsiveness-testing-1)

#### [Browser Compatibility Testing](#browser-compatibility-testing-1)

### [Code Validation](#code-validation-1)

#### [HTML Validation](#html-validation-1)

#### [CSS Validation](#css-validation-1)

#### [ESlint Validation](#eslint-validation-1)

### [Lighthouse Report](#lighthouse-report-1)

### [Backend Testing](#backend-testing-1)

#### [Automated Tests](#automated-tests-1)

### [Backend Code Validation](#backend-code-validation-1)

#### [Python Validation](#python-validation-1)

#### [Bugs](#bugs-1)



## Frontend Testing

### Automated Testing

I created 4 tests:
* renders Navbar
* renders user's username
* renders liked link
* clicking post link renders post form

![Tests](/documentation/testing/frontend-automated.png)

### Manual Testing

| Page | User state | Test | Expected Result | Notes |
| --- | --- | --- | --- | --- |
| Homepage  | Logged out | Click on logo, "Birdie" or Feed | Redirect to the homepage if not there | Pass |
|  | Logged out | Click on Register | Redirect to Register page | Pass |
|  | Logged out | Click on Login | Redirect to Login page | Pass |
|  | Logged in | Click on Post in the navbar | Redirect to post creation form | Pass |
|  | Logged in | Click on Subscribed in the navbar | Redirect to subscription feed | Pass |
|  | Logged in | Click on Liked in the navbar | Redirect to liked feed | Pass |
|  | Logged in | Click on Saved in the navbar | Redirect to saved feed | Pass |
|  | Logged in | Click on Saved in the navbar | Redirect to saved feed | Pass |
|  | Logged in | Click on heart icon on a post | Icon changes, number of likes changes | Pass |
|  | Logged in | Click on an egg/owl icon on a post | Icon changes, number of saves changes | Pass |
|  | Logged in | Make username longer than 9 characters | Only avatar displays in the navbar | Pass, tip - further down, you can find tests on updating username |
| | Logged in user  on a smaller screen | Expand dropdown | Popular categories appear | Pass |
| | Logged in user  on a smaller screen | | username doesn't show in the navbar | Pass |
|  |  | Reload the tab several times | Advertisement randomly changes | Pass |
|  |  | Click on one of the popular categories | Feed displays posts from that category | Pass |
|  |  | Click on one of the users in one of the posts | User's profile loads | Pass |
|  | Logged out | Like a post | Hover displays, advising you to log in | Pass |
|  | Logged out | Click on a comment icon in one of the posts | Redirect to login | Pass |
|  | Logged out | Click on the post body | Redirect to login | Pass |
|  | | Scroll down | More posts load | Pass |
|  | | manually input nonexistent url | 404 page loads | Pass |
| Register  | Logged out | Click on "Login" in the form | Redirect to Login Page | Pass |
|  | Logged out | Click Register button before inputing anything in the form | Notifications regarding input fields display | Pass |
|  | Logged out | Input username and only two characters in the password section | Notification regarding input field displays | Pass |
|  | Logged out | Fill the form out per Alert requirements, submit form | Redirect to Login Page | Pass |
|  | Logged in | Manually add /register to the url and try accessing the page | Redirect to the homepage | Pass |
| Login | Logged out | Click on "Register" in the form | Redirect to Register Page | Pass |
|  | Logged out | Submit form without filling it out | Notification regarding input field displays | Pass |
|  | Logged out | Submit form with only one field filled out | Notification regarding input field displays | Pass |
|  | Logged out | Submit form with your details correctly | Redirect to the main page, navbar displays options available to logged in users | Pass |
|  | Logged in | Manually add /login to the url and try accessing the page | Redirect to the homepage | Pass |
| Post create form | Logged in | Submit a post without inputing anything into the form | Notifications display on the post body and category dropdown | Pass |
| | Logged in | Fill the form out with image larger than 2MB | Notification displays | Pass, tip - use Google advanced search to find such image |
| | Logged in | Fill the form out with/without an image, submit | Redirect to the post page, post displays content which was inputted | Pass |
| Post page | Post owner | Click on the 3 dots | Dropdown appears | Pass |
| | Post owner | Click heart icon in the post | Hover notification appears | Pass |
| | Post owner | Click edit icon in the dropdown | Redirect to edit post | Pass |
| | Post owner | Click delete icon in the dropdown | Redirect to homepage, post is visible | Pass |
| | Logged in user | Click on an egg icon | Icon switches to an owl | Pass, additionally, click on "Saved" in the navbar to find said post |
| | Logged in user | Click on an owl icon | Icon switches to an egg | Pass, additionally, click on "Saved" in the navbar to verify that post isn't there |
| | Logged in user | Click Comment button without inputing a comment | Nothing happens | Pass |
| | Logged in user | Input a comment, click Comment | Comment is displayed, number of comments goes up by one | Pass |
| | Logged in user | Input a comment without spaces, longer than the width of the comment section, click Comment | Comment is displayed, does not widen the comment section, number of comments goes up by one | Pass |
| | Comment owner | Click on the three dots next to the comment | Dropdown appears | Pass |
| | Comment owner | Click on edit icon in the dropdown | Edit comment form appears | Pass |
| | Comment owner | In comment edit form, delete comment and click Update | Nothing happens | Pass |
| | Comment owner | In comment edit form, click Cancel button | Edit form disappears | Pass |
| | Comment owner | In comment edit form, update comment, click Update button | Updated comment appears, time is updated to "now" | Pass |
| | Comment owner | Click on delete icon in the dropdown | Comment is deleted, number of comments goes down | Pass |
| | Logged in user | Click on the user's avatar or username | Redirect to Profile page | Pass |
| | Logged in user | Add /edit to the end of someone else's post's url | Redirect to homepage | Pass |
| Profile page | Logged in user | If not profile owner, click "Follow" | Button switches to "Unfollow", number of followers goes up by one | Pass, additionally, click on "Subscribed" to find user's posts there |
| | Logged in user | If already following, click "Unfollow" | Button switches to "Follow", number of followers goes down by one | Pass, additionally, click on "Subscribed" to find user's posts not there |
| | Logged in user | Hover over status stats | Hover appears, explaining the stat | Pass |
| | Profile owner | Click on the three dots | Dropdown appears | Pass |
| | Profile owner | Click on editing profile | Redirect to Profile edit page | Pass |
| | Profile owner | Click on editing username | Redirect to Edit username page | Pass |
| | Profile owner | Click on editing password | Redirect to Edit password page | Pass |
| | Logged in user on a smaller screen | | Advertisement appears | Pass |
| Profile edit page | Profile owner | Update name, bio and image | Redirect to Profile page, profile displays what was added | Pass |
| | Profile owner | Click Cancel | Redirect to Profile page | Pass |
| Username edit page | Profile owner | Click Cancel | Redirect to Profile page | Pass |
| | Profile owner | Remove username | Alert notification appears | Pass |
| | Profile owner | Save new username | Redirect to Profile page, username is updated | Pass |
| Password edit page | Profile owner |  Click Cancel | Redirect to Profile page | Pass |
| | Profile owner | Click Save without inputting passwords | Alert notification appears | Pass |
| | Profile owner | Click Save after inputting different passwords in the two fields | Alert notification appears | Pass |


### Responsiveness Testing

<details>
<summary> Homepage
</summary>

![Homepage](/documentation/testing/responsiveness/homepage.png)
</details>

<details>
<summary> Login
</summary>

![Login](/documentation/testing/responsiveness/login.png)
</details>

<details>
<summary> Profile
</summary>

![Profile](/documentation/testing/responsiveness/profile.png)
</details>

<details>
<summary> Post form
</summary>

![Post form](/documentation/testing/responsiveness/post-create.png)
</details>

<details>
<summary> Category page
</summary>

![Category page](/documentation/testing/responsiveness/category.png)
</details>

<details>
<summary> 404
</summary>

![404](/documentation/testing/responsiveness/404.png)
</details>

### Browser Compatibility Testing

<details>
<summary> Chrome
</summary>

![Chrome](/documentation/testing/compatibility/chrome.png)
</details>

<details>
<summary> Mozilla firefox
</summary>

![Mozilla](/documentation/testing/compatibility/mozilla.png)
</details>

<details>
<summary> Edge
</summary>

![Edge](/documentation/testing/compatibility/edge.png)
</details>

<details>
<summary> Brave
</summary>

![Brave](/documentation/testing/compatibility/brave.png)
</details>

## Code Validation

### HTML Validation

I have used [W3C Markup Validation Service](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbirdie-app-3064fd5d3b6f.herokuapp.com%2F) to validate my HTML. Apart from informational messages regarding trailing slashes on void elements, there were no errors found.

![W3C Validation](/documentation/testing/w3c-html.png)


### CSS Validation

I have used [W3C Jigsaw](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbirdie-app-3064fd5d3b6f.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#errors) to validate my CSS. Along the warnings coming from external dependencies, I have encountered one error. Line was removed from CSS as it was redundant.

![W3C Validation](/documentation/testing/w3c.png)

### ESlint Validation

![ESlint Validation](/documentation/testing/eslint.png)

* I was aware of the specific warning prior to running ESlint, however, potential solutions cause issues on the frontend. As a result, I have opted to acknowledge, but ignore the error.

## Lighthouse Report

<details>
<summary> Desktop Lighthouse report
</summary>

![Desktop Lighthouse report](/documentation/testing/lighthouse/desktop.png)
</details>

<details>
<summary> Mobile Lighthouse report
</summary>

![Mobile Lighthouse report](/documentation/testing/lighthouse/mobile.png)

* Mobile Lighthouse reports seems to be a result of images not having explicit height and width, cache policy, etc.
</details>

## Backend Testing

###  Automated Tests

I ran seven automated tests in the backend. The tests were initially written during building of the backend.
In order to run them successfully now in the unified project, I had to append `api/` to the start of all test urls, as well as comment in `os.environ['DEV'] = '1'` in `env.py` temporarily.

#### Test list

* Logged in user can create a post
* User can list posts
* Logged in user can delete their post
* Logged in user can create a comment
* Logged in user can delete their comment
* User can list comments
* User can list categories

![Automated tests](/documentation/testing/python/backend-automated.png)

## Backend Code Validation

### Python Validation

Python validation was performed using CI Python Linter to make sure that the code contains no errors.

#### [drf_api](drf_api)

<details>
<summary> Permissions
</summary>

![Permissions](/documentation/testing/python/validation/drf_api-permissions.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/drf_api-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/drf_api-views.png)
</details>

<details>
<summary> Settings
</summary>

![Settings](/documentation/testing/python/validation/drf_api-settings.png)
</details>


#### [advertisements](advertisements)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/advertisements-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/advertisements-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/advertisements-views.png)
</details>


#### [categories](categories)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/categories-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/categories-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/categories-views.png)
</details>

#### [comments](comments)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/comments-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/comments-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/comments-views.png)
</details>

#### [companies](companies)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/companies-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/companies-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/companies-views.png)
</details>


#### [followers](followers)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/followers-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/followers-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/followers-views.png)
</details>


#### [posts](posts)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/posts-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/posts-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/posts-views.png)
</details>


#### [products](products)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/products-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/products-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/products-views.png)
</details>

#### [profiles](profiles)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/profiles-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/profiles-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/profiles-views.png)
</details>

#### [saved_posts](saved_posts)
<details>
<summary> Models
</summary>

![Models](/documentation/testing/python/validation/saved_posts-models.png)
</details>

<details>
<summary> Serializers
</summary>

![Serializers](/documentation/testing/python/validation/saved_posts-serializers.png)
</details>

<details>
<summary> Views
</summary>

![Views](/documentation/testing/python/validation/saved_posts-views.png)
</details>


## Bugs

* Visual bug - when using dev tools, clicking icons results in them displaying their `hover` color constantly, but this doesn't impact regular user.

* User status - when saving a post for later on a user's profile page, status number does not immediatelly update but only upon refresh. As status is mainly relevant to the profile owner, this was not considered a priority and can be reviewed in future updates.