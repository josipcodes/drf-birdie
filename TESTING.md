# Birdie | Testing

Return to [README](README.md).

## Frontend Testing

### Automated Testing

### Manual Testing

### Responsiveness Testing

### Browser Compatibility Testing

## Code Validation

### HTML Validation

### CSS Validation

### ESlint Validation

## Lighthouse Report

### Desktop

### Mobile

## Backend Testing

### Automated Testing

I ran seven automated tests in the backend. In order to achieve this in the unified project, I had to append api/ to the start of all test urls, as well as comment in `os.environ['DEV'] = '1'` in `env.py`.

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

* Python validation was performed using CI Python Linter to make sure that the code contains no errors.

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