# Birdie | Testing

Return to [README](README.md).

## Frontend Testing

### Automated Testing

I created 4 tests:
* renders Navbar
* renders user's username
* renders liked link
* clicking post link renders post form

![Tests](/documentation/testing/frontend-automated.png)

### Manual Testing

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

### Automated Testing

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

## Code Validation

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