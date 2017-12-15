define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/articles",
    "title": "Insert a new Article",
    "name": "AddArticle",
    "group": "AllArticles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>The Title of article to create</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"ID\": 1,\n    \"TITLE\" : \"Lorem Ipsum\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "AllArticles"
  },
  {
    "type": "get",
    "url": "/api/v1/articles",
    "title": "Request all articles",
    "name": "GetArticles",
    "group": "AllArticles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"ID\": 1,\n        \"TITLE\" : \"Lorem Ipsum\"\n    },\n    {\n        \"ID\": 2,\n        \"TITLE\" : \"The game\"\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "AllArticles"
  },
  {
    "type": "get",
    "url": "/api/v1/articles?paragraphs=true",
    "title": "Request all articles with their paragraphs",
    "name": "GetArticlesWithParagraphs",
    "group": "AllArticles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "CONTENT",
            "description": "<p>List of paragraphs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "CONTENT.ID",
            "description": "<p>Id of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CONTENT.TITLE",
            "description": "<p>Title of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "CONTENT.POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "CONTENT.ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"ID\": 1,\n        \"TITLE\" : \"Lorem Ipsum\",\n        \"CONTENT\": [\n                {\n                    \"ID\": 1,\n                    \"CONTENT\": \"Lorem ipsum dolor sit amet.\",\n                    \"POSITION\": 1,\n                    \"ARTICLE_ID\": 1\n                },\n                {\n                    \"ID\": 2,\n                    \"CONTENT\": \"Ut enim ad minim veniam.\",\n                    \"POSITION\": 2,\n                    \"ARTICLE_ID\": 1\n                },\n                ...\n    },\n    {\n        \"ID\": 2,\n        \"TITLE\" : \"The game\",\n        \"CONTENT\" : [\n                {\n                    \"ID\": 3,\n                    \"CONTENT\": \"Perdu !\",\n                    \"POSITION\": 1,\n                    \"ARTICLE_ID\": 2\n                },\n                ...\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "AllArticles"
  },
  {
    "type": "get",
    "url": "/api/v1/paragraphs",
    "title": "request all paragraphs",
    "name": "GetParagraphs",
    "group": "AllParagraphs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the paragraph</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CONTENT",
            "description": "<p>Content of the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"ID\": 1,\n        \"CONTENT\": \"Lorem ipsum dolor sit amet.\",\n        \"POSITION\": 1,\n        \"ARTICLE_ID\": 1\n    },\n    {\n        \"ID\": 2,\n        \"CONTENT\": \"Ut enim ad minim veniam.\",\n        \"POSITION\": 2,\n        \"ARTICLE_ID\": 1\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "AllParagraphs"
  },
  {
    "type": "get",
    "url": "/api/v1/paragraphs/:id",
    "title": "Request a paragraph",
    "name": "GetParagraphs",
    "group": "AllParagraphs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the paragraph</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CONTENT",
            "description": "<p>Content of the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraphe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"ID\": 1,\n        \"CONTENT\": \"Lorem ipsum dolor sit amet.\",\n        \"POSITION\": 1,\n        \"ARTICLE_ID\": 1\n    },\n    {\n        \"ID\": 2,\n        \"CONTENT\": \"Ut enim ad minim veniam.\",\n        \"POSITION\": 2,\n        \"ARTICLE_ID\": 1\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "AllParagraphs"
  },
  {
    "type": "delete",
    "url": "/api/v1/articles/:id",
    "title": "Delete an article",
    "name": "DeleteArticle",
    "group": "Article",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the deleted article</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"Response: \"Successfully deleted article with ID <code>ID</code>\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ArticleNotFound",
            "description": "<p>No article with the ID <code>ID</code> found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n        \"Error\": \"No article with the ID <code>ID</code> found\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/api/v1/articles/:id",
    "title": "request Article information",
    "name": "GetArticle",
    "group": "Article",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"ID\": 1,\n    \"TITLE\" : \"Lorem Ipsum\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ArticleNotFound",
            "description": "<p>No article with the ID <code>ID</code> found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Article"
  },
  {
    "type": "patch",
    "url": "/api/v1/articles/:id",
    "title": "Modify an article",
    "name": "PatchArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>The Title of article to patch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article patched</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"ID\": 1,\n    \"TITLE\" : \"Lorem Ipsum\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/api/v1/articles/:idA/paragraphs",
    "title": "Add a new paragraph of the article",
    "name": "AddParagraph",
    "group": "Paragraph",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Optional Id of the paragraph patched</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "CONTENT",
            "description": "<p>Optional Content of the paragraph patched</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>Optional position of the paragraph in the article</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>Optional Id of the article associated to the paragraph</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n    [\n        {\n            \"ID\": 2,\n            \"CONTENT\": \"Ut enim ad minim veniam.\",\n            \"POSITION\": 2,\n            \"ARTICLE_ID\": 1\n        },\n        ...\n    ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Paragraph"
  },
  {
    "type": "delete",
    "url": "/api/v1/paragraphs/:id",
    "title": "Delete a paragraph",
    "name": "DeleteParagraph",
    "group": "Paragraph",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the deleted paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"Response: \"Successfully deleted paragraph with ID <code>ID</code>\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ArticleNotFound",
            "description": "<p>No paragraph with the ID <code>ID</code> found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n        \"Error\": \"No paragraph with the ID <code>ID</code> found\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Paragraph"
  },
  {
    "type": "get",
    "url": "/api/v1/articles/:idA/paragraphs/:pos",
    "title": "Get the pos-ian paragraph of the article",
    "name": "GetParagraph",
    "group": "Paragraph",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n    [\n        {\n            \"ID\": 2,\n            \"CONTENT\": \"Ut enim ad minim veniam.\",\n            \"POSITION\": 2,\n            \"ARTICLE_ID\": 1\n        },\n        ...\n    ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Paragraph"
  },
  {
    "type": "patch",
    "url": "/api/v1/paragraphs/:id",
    "title": "Modify a paragraph",
    "name": "Patchparagraph",
    "group": "Paragraph",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Optional Id of the paragraph patched</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "CONTENT",
            "description": "<p>Optional Content of the paragraph patched</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>Optional position of the paragraph in the article</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>Optional Id of the article associated to the paragraph</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n    {\n        \"ID\": 2,\n        \"CONTENT\": \"Ut enim ad minim veniam.\",\n        \"POSITION\": 2,\n        \"ARTICLE_ID\": 1\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Paragraph"
  },
  {
    "type": "get",
    "url": "/api/v1/articles/:idA/paragraphs",
    "title": "Request all paragraphs of the article",
    "name": "GetParagraphs",
    "group": "Paragraphs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TITLE",
            "description": "<p>Title of the article patched</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "POSITION",
            "description": "<p>The position of the paragraph in the article</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ARTICLE_ID",
            "description": "<p>The Id of the article associated to the paragraph</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n    [\n        {\n            \"ID\": 2,\n            \"CONTENT\": \"Ut enim ad minim veniam.\",\n            \"POSITION\": 2,\n            \"ARTICLE_ID\": 1\n        },\n        ...\n    ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/Dispatcher.php",
    "groupTitle": "Paragraphs"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_maxime_workspace_COURS_Front_Back_Back_doc_main_js",
    "groupTitle": "_home_maxime_workspace_COURS_Front_Back_Back_doc_main_js",
    "name": ""
  }
] });
