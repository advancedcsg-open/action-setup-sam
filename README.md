# Action Setup AWS SAM CLI

This actions install the AWS SAM CLI. The action currently supports Ubuntu and MacOS action runners.

## Inputs

### `telemetry-enabled`

**Optional** Whether to allow AWS to gather telemtry data on the ccli usage. Valid values are `"yes"` or `"no"`. Default `"yes"`

## Example usage

The cli requires valid AWS credentials. These can be set as environment variables or using the [Configure AWS Credentials[https://github.com/aws-actions/configure-aws-credentials]] action and should be set when you run the cli.

### Example 1 - using Configure AWS Credentials action

```yaml
jobs:
  build:
    name: Package template
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup SAM CLI
      uses: advancedcsg-open/action-setup-sam@v1

   - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-2

    - name: Validate SAM template
      run: sam validate --template template.yml

    - name: Package SAM template
      run: sam package --template-file template.yml --output-file-template dist/packaged.template --s3-bucket mys3bucket --s3-prefix path/to/package
```

### Example 2 - using environment variables

```yaml
jobs:
  build:
    name: Package template
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup SAM CLI
      uses: advancedcsg-open/action-setup-sam@v1

    - name: Validate SAM template
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      run: sam validate --template template.yml --region us-east-2

    - name: Package SAM template
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      run: sam package --template-file template.yml --output-file-template dist/packaged.template --s3-bucket mys3bucket --s3-prefix path/to/package --region us-east-2
```
