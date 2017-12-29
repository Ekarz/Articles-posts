# Compte-rendu du devoir final Frontend-Backend

- [Compte rendu](#compte-rendu-du-devoir-final-frontend-backend)
    - [Binal du travail](#bilan-du-travail)
    - [Choix effectués](#choix-effectués)
      - [Langages et librairies utilisées](#langages-et-librairies-utilisées)
      - [Structure générale](#structure-générale)
    - [Présentation du BackEnd](#présentation-du-back-end)
      - [Le Framework](#le-framework)
        - [Route.php](#route.php)
        - [Router.php](#router.php)
        - [Routerutils.php](#routerutils.php)
      - [Utilisation](#utilisation)
        - [Configuration de la base de donnée](#configuration-de-la-base-de-donnée)
        - [Configuration d'apache](configuration-d-apache)
        - [Configuration du serveur php](#configuration-du-serveur-php)
      - [Fonctionnement](#fonctionnement)
    - [Perspectives d'amélioration](#perspectives-d-amélioration)
    - [Bilan du module](#bilan-du-module)
    - [APIDOC](#apidoc)

## Bilan du travail

* Mise en place d'un repository sur Gitlab
* Mise en place de Bootstrap et jQuery
* Mise en place d'une base de données MySQL contenant les articles et les paragraphes
* Mise en place d'une API REST permettant de gérer les articles et leurs paragraphes
* Mise en place d'un front-office fournissant une interface à l'utilisateur et requêtant l'API

## Choix effectués

### Langages et librairies utilisées

### Structure générale

Nous avons décidé de nous diriger vers l'utilisation d'une API RestFull afin d'une part, de découpler le développement du Back-End et celui du Front-End.

Ainsi, cela nous a permis de travailler dans deux dossiers complétements séparés, nous permettant d'éviter les régression de l'un lorsque l'on modifie la structure de l'autre.

Nous avons ainsi choisi de de réaliser notre Back-End en pHp, en utilisant le typage des arguments de fonctions, ainsi que le typage de retour de fonction, afin d'augmenter la robustesse de notre coed produit.

Concernant le Front-End, nous utilisont la librairie jQuery pour réaliser les interactions avec l'utilisateur, ainsi que la librairie Bootstrap, permettant un meilleur rendu.

Le serveur sur lequel notre projet s'execute est apache, avec une configuration que nous détaillerons ultérieurement.

## Présentation du Back-End

### Le Framework

Nous avons décidé d'écrire notre propre Framework afin de réaliser notre API. En effet, cela nous permettait d'avoir une bone compréhension de son fonctionement, tout en étant léger car adapté à nos besoins.

Ainsi le routage s'effectue à l'aide de regex, qui nous permet de facilement faire évoluer nos routes, mais également de facilement récupérer les paramétres éventuels nécessaire au bon fonctionnement de l'API, par exemple, dans le cas de la route:

```url
/api/v1/articles/5/paragraphs/1
```

Nous voulons récupérer le ```5``` associé à un ID d'article, ainsi que le `5`, associé à un paragraph dans l'article `1`.

Cela est, grâce à l'utilisation re regex, facilement réalisable, par exemple en utilisant cette regex:

```regex
~^/articles/(\d+)/paragraphs/(\d+)/?$~
```

Ainsi, le Framework se compose de 3 classes :

> * Route.php
> * Router.php
> * RouterUtils.php

#### Route.php

La classe Route est un objet qui contient:

* L'expression régulière qui doit correspondre
* La méthode HTTP qui doit correspondre
* La fonction de callback utilisé lorsque la Route est apelée

#### Router.php

La classe Router.php se charge de lister l'ensemble des routes de l'application.
Elle est également appelée lors d'une nouvelle requête afin d'essayer de trouver une route qui correspond à la requête.

#### RouterUtils.php

Cette classe permet de réaliser divers traitements sur la requete:

* Récupérer la partie intéressante de la route (retirer la partie `/api/v1`)
* Récupérer leBody de la requête
* Executer le callback de la route
* Emettre la réponse au client

### Utilisation

#### Configuration de la base de donnée

Une base de donnée MySQL ou MariaDB est nécessaire pour faire fonctionnet le projet.
Afin d'initier le contenu, un utilisateur ainsi qu'une base sont nécessaire.

Ensuite, il suffit d'exécuter la commande suivante pour intialiser les tables:

```bash
source {/path/to/the/project}/Back/src/script.sql
```

#### Configuration d'apache

Le module rewrite est nécessaire :

```bash
a2enmod rewrite
```

#### Configuration du serveur php

Renommer Back/src/config.example.php en config.php

Remplir les champs:

> - $host correspond à l'adresse où la base de donnée se situe (ex: localhost)
> - $dbname est le nom donné à la base préalablement créé
> - $username et $password informations de connexion à la base

### Fonctionnement

La manière dont sont transmis les paramètres s'effectue de la manière suivante:

La classe Router récupére les paramètres issues des parenthèses capturantes de l'expression régulière.

Ils sont transmis dans un tableau et dans l'ordre d'apparition au sein de l'expression régulière.

La fonction match() renvoie ainsi un tableau contenant comme premier argument le callback de la route, et comme deuxième argument, un tableau des identifiants récupérés par la regex.

Au seins de executeRoute() de RouterUtils,
Le tableau [callback, params] et les données du Body sont transformé pour donner un tableau associatif contenant les paramètres et les données du Body.

En résumé, le callback reçoit un unique paramètre qui est un tableau associatif et qui contient;

* Dans 'URL_PARAMS', un tableau contenant les paramètres récupérés dans l'url de la requete
* Dans 'BODY_DATA', un tableau associatif correspondant au json envoyé dans la requête

Le callback se charge ainsi simplement d'extraire les valeurs des paramètres et des données du Body, et au besoin, d'affecter des valeurs par défaut dans le cas d'arguments facultatifs.

1. Le Callback extrait les valeurs des paramètres des données du Body, et assigne des valeurs par défaut si besoin.
2. Le controlleur, appelé par le callback, vérifie la validité des arguments extraits par le callback.
3. Le modèle, appelé par le controlleur, construit la requête SQL adapté, avec la éventuels paramètres.
4. DBAccess, appelé par le modèle, se charge d'executer la requête.
5. Le controlleur reçoit la réponse de DBAccess, vérifie sa validité, et transforme le résultat en json.
6. Le callback apelle la fonction response() de RouterUtils avec comme paramètre le résultat du contrôlleur pour l'émmettre au client.

## Perspectives d'amélioration

## Bilan du module

## APIDOC

- [AllArticles](#allarticles)
  - [Insert a new Article](#insert-a-new-article)
  - [Request all articles](#request-all-articles)
  - [Request all articles with their paragraphs](#request-all-articles-with-their-paragraphs)

- [AllParagraphs](#allparagraphs)
  - [Request a paragraph](#request-a-paragraph)
- [Article](#article)
  - [Delete an article](#delete-an-article)
  - [request Article information](#request-article-information)
  - [Modify an article](#modify-an-article)

- [Paragraph](#paragraph)
  - [Add a new paragraph in the article](#add-a-new-paragraph-in-the-article)
  - [Delete a paragraph](#delete-a-paragraph)
  - [Get the pos-ian paragraph of the article](#get-the-pos-ian-paragraph-of-the-article)
  - [Modify a paragraph](#modify-a-paragraph)

- [Paragraphs](#paragraphs)
  - [Request all paragraphs of the article](#request-all-paragraphs-of-the-article)

# AllArticles

## Insert a new Article

[Back to top](#top)

  POST /api/v1/articles

### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| TITLE | String | <p>The Title of article to create</p>|

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
{
    "ID": 1,
    "TITLE" : "Lorem Ipsum"
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article created</p>|
| TITLE | String | <p>Title of the article created</p>|

## Request all articles

[Back to top](#top)

  GET /api/v1/articles

### Success Response

Success-Response:

```js
HTTP/1.1 200 OK
[
    {
        "ID": 1,
        "TITLE" : "Lorem Ipsum"
    },
    {
        "ID": 2,
        "TITLE" : "The game"
    },
    ...
]
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article</p>|
| TITLE | String | <p>Title of the article</p>|

## Request all articles with their paragraphs

[Back to top](#top)

  GET /api/v1/articles?paragraphs=true

### Success Response

Success-Response:

```js
HTTP/1.1 200 OK
[
    {
        "ID": 1,
        "TITLE" : "Lorem Ipsum",
        "CONTENT": [
                {
                    "ID": 1,
                    "CONTENT": "Lorem ipsum dolor sit amet.",
                    "POSITION": 1,
                    "ARTICLE_ID": 1
                },
                {
                    "ID": 2,
                    "CONTENT": "Ut enim ad minim veniam.",
                    "POSITION": 2,
                    "ARTICLE_ID": 1
                },
                ...
    },
    {
        "ID": 2,
        "TITLE" : "The game",
        "CONTENT" : [
                {
                    "ID": 3,
                    "CONTENT": "Perdu !",
                    "POSITION": 1,
                    "ARTICLE_ID": 2
                },
                ...
    },
    ...
]
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article</p>|
| TITLE | String | <p>Title of the article</p>|
| CONTENT | Object[] | <p>List of paragraphs</p>|
| CONTENT.ID | Number | <p>Id of the article patched</p>|
| CONTENT.TITLE | String | <p>Title of the article patched</p>|
| CONTENT.POSITION | Number | <p>The position of the paragraph in the article</p>|
| CONTENT.ARTICLE_ID | Number | <p>The Id of the article associated to the paragraph</p>|

# AllParagraphs

## Request a paragraph

[Back to top](#top)

  GET /api/v1/paragraphs/:id

### Success Response

Success-Response:

```js
HTTP/1.1 200 OK
{
        "ID": 1,
        "CONTENT": "Lorem ipsum dolor sit amet.",
        "POSITION": 1,
        "ARTICLE_ID": 1
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the paragraph</p>|
| CONTENT | String | <p>Content of the article</p>|
| POSITION | Number | <p>The position of the paragraph in the article</p>|
| ARTICLE_ID | Number | <p>The Id of the article associated to the paragraphe</p>|

# Article

## Delete an article

[Back to top](#top)

  DELETE /api/v1/articles/:id

### Success Response

201 Success-Response:

```js
HTTP/1.1 201 OK
{
    "Response" : "Successfully deleted article with ID <code>ID</code>",
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the deleted article</p>|

### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ArticleNotFound |  | <p>No article with the ID <code>ID</code> found</p>|

### Error Response

Error-Response:

```js
HTTP/1.1 404 Not Found
    {
        "Error": "No article with the ID <code>ID</code> found"
    }
```

## request Article information

[Back to top](#top)

  GET /api/v1/articles/:id

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
{
    "ID": 1,
    "TITLE" : "Lorem Ipsum"
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article</p>|
| TITLE | String | <p>Title of the article</p>|

### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ArticleNotFound |  | <p>No article with the ID <code>ID</code> found</p>|

## Modify an article

[Back to top](#top)

  PATCH /api/v1/articles/:id

### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| TITLE | String | <p>The Title of article to patch</p>|

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
{
    "ID": 1,
    "TITLE" : "Lorem Ipsum"
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article patched</p>|
| TITLE | String | <p>Title of the article patched</p>|

# Paragraph

## Add a new paragraph in the article
[Back to top](#top)

  POST /api/v1/articles/:idA/paragraphs

### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| CONTENT | String | <p>Content of the paragraph patched</p>|
| POSITION | Number | <p>Optional position of the paragraph in the article (if empty, the paragraph is added at the end of the article)</p>|
| ARTICLE_ID | Number | <p>Id of the article associated to the paragraph</p>|

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
    [
        {
            "ID": 2,
            "CONTENT": "Ut enim ad minim veniam.",
            "POSITION": 2,
            "ARTICLE_ID": 1
        },
        ...
    ]
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article</p>|
| TITLE | String | <p>Title of the article</p>|
| POSITION | Number | <p>The position of the paragraph in the article</p>|
| ARTICLE_ID | Number | <p>The Id of the article associated to the paragraph</p>|

## Delete a paragraph
[Back to top](#top)

  DELETE /api/v1/paragraphs/:id

### Success Response

201 Success-Response:

```js
HTTP/1.1 201 OK
{
    "Response" : "Successfully deleted paragraph with ID <code>ID</code>",
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the deleted paragraph</p>|

### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ArticleNotFound |  | <p>No paragraph with the ID <code>ID</code> found</p>|

### Error Response

Error-Response:

```js
HTTP/1.1 404 Not Found
    {
        "Error": "No paragraph with the ID <code>ID</code> found"
    }
```
## Get the pos-ian paragraph of the article
[Back to top](#top)

  GET /api/v1/articles/:idA/paragraphs/:pos

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
    [
        {
            "ID": 2,
            "CONTENT": "Ut enim ad minim veniam.",
            "POSITION": 2,
            "ARTICLE_ID": 1
        },
        ...
    ]
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article patched</p>|
| TITLE | String | <p>Title of the article patched</p>|
| POSITION | Number | <p>The position of the paragraph in the article</p>|
| ARTICLE_ID | Number | <p>The Id of the article associated to the paragraph</p>|

## Modify a paragraph

[Back to top](#top)

  PATCH /api/v1/paragraphs/:id

### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Optional Id of the paragraph patched</p>|
| CONTENT | String | <p>Optional Content of the paragraph patched</p>|
| POSITION | Number | <p>Optional position of the paragraph in the article</p>|
| ARTICLE_ID | Number | <p>Optional Id of the article associated to the paragraph</p>|

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
    {
        "ID": 2,
        "CONTENT": "Ut enim ad minim veniam.",
        "POSITION": 2,
        "ARTICLE_ID": 1
    }
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the article patched</p>|
| TITLE | String | <p>Title of the article patched</p>|
| POSITION | Number | <p>The position of the paragraph in the article</p>|
| ARTICLE_ID | Number | <p>The Id of the article associated to the paragraph</p>|

# Paragraphs

## Request all paragraphs of the article

[Back to top](#top)

  GET /api/v1/articles/:idA/paragraphs

### Success Response

Success-Response:

```js
HTTP/1.1 201 OK
    [
        {
            "ID": 2,
            "CONTENT": "Ut enim ad minim veniam.",
            "POSITION": 2,
            "ARTICLE_ID": 1
        },
        ...
    ]
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| ID | Number | <p>Id of the paragraph</p>|
| CONTENT | String | <p>Content of the paragraph</p>|
| POSITION | Number | <p>The position of the paragraph in the article</p>|
| ARTICLE_ID | Number | <p>The Id of the article associated to the paragraph</p>|
