# EasyAdminFieldsBundle

## Mask field

### Usage

- With the MaskField wrapper

```php
MaskField::adapt(
    BooleanField::new('hasAuthor'),
    [
        "true" => ['author']
    ]
)
```

- Directly adding form type options to your field

```php
BooleanField::new('hasAuthor')
    ->setFormTypeOptions([ 
        'row_attr' => [
            'data-controller' => 'mask-field',
            'data-mask-field-map' => MaskField::encodeMap([
                "true" => ['author']
            ])
        ],
    ])
```

### Configuration

The map configuration works like this:

- The key corresponds to an input value
- The value is an array of field names

With this map configuration :

```php
[
    "true" => ['author']
]
```

The `author` field is shown only when `true` is the input value, otherwise, the `author` field is masked

With this map configuration :

```php
[
    "A" => ['field1'],
    "B" => ['field1', 'field2'],
    "C" => ['field2'],
]
```

The `field1` field is shown when either `A` or `B` is the input value, the `field2` field is shown when either `B`
or `C` is the input value