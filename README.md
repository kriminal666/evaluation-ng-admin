# evaluation-ng-admin configuration

This is a evaluation module RestAPI administrator. [http://ng-admin.marmelab.com/](http://ng-admin.marmelab.com/).

The interesting part of the code is in public/app.js

## Configuration

You have to disable middleware on the controller constructor (Evaluation and GradeScale). Comment this line:

```php
$this->middleware('auth');
```
Now change de return of the index and show methods:

Index:

```php
$gradeScales = GradeScale::all();
  return $this->gradeScaleTransformer->transformCollection($gradeScales->toArray());
```

Show($id):

```php
 $evaluation = Evaluation::find($id);
 return $this->evaluationTransformer->transform($evaluation);
```


## Installation

```sh
make install
```

## Run

Run the web server:

```sh
make run
```

You can now open `http://localhost:3000/`

![alt text][evaluation.png]

![alt text][grade_scale.png]

## Evaluation project

[Here is the project](https://github.com/kriminal666/Evaluation)

