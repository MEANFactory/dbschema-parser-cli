# dbschema-parser-cli
Command line interface for [dbschema-parser](https://github.com/MEANFactory/dbschema-parser).  Generates database-specific resource files from the `.dbs` files output by Wise Coders Solutions' [DbSchema Diagram Designer and Query Tool](http://www.dbschema.com/).

## Limitations

Currently, the parser only generates from **MySql** to **Mongoose (MongoDB)**.  The CLI is meant to be plugable, however only one generator has been created so far ([dbschema-mongoose](https://github.com/MEANFactory/dbschema-mongoose)).

## Installation

`npm install -g dbschema-parser-cli`

## Usage

### Options:

```
-i | --input  : (required) Source DbSchema file.
-f | --format : Output format.  Defaults to mongoose.
-o | --output : Output folder path.  Defaults to ./generated/%datetime%
-O | --overwrite : Overwrite existing files (default: false)
```

### Example Usage:
The following line:  

```
dbschema -i ../dbschema-parser/examples/geography/resources.dbs
```  
Generates the following Mongoose / MongoDB model files:  

```
\ generated
+- \ 20170717211353
   +- index.js
      \ resources
      +- index.js
         \ geography
         +- city.js
            country.js
            index.js
            postal_code.js
            state.js
            
```

## About MEAN Factory

MEAN Factory is an initiative to help teach software development focusing on the MEAN Stack (Mongo, ExpressJS, AngularJS, NodeJS).  For more information, visit our web site or email us:  

[http://meanfactory.com](http://www.meanfactory.com)  
[info@meanfactory.com](mailto:info@meanfactory.com)  
