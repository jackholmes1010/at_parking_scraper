# AT Parking Script

This script will automatically create a parking ticket for you every 30 minutes, for 15 minutes, thus minimizing parking fees.

> Note this will not work well if you have more than one vehicle registered on your AT account.

## Install Dependencies

```
npm install
```

## Setup environment

Create a `.env` file with the contents of [`.env.example`](.env.example).

### Options

#### `AT_USERNAME`/ `AT_PASSWORD`

The username/password you use to login to the AT parking app/website at https://federation.aucklandtransport.govt.nz/.

#### `ZONE_ID`

The parking area ID is a 6-digit number used to define the parking location.

See https://at.govt.nz/driving-parking/paying-for-parking/at-park-help/#where for more info.

#### `NUMBER_PLATE` (optional)

Your vehicle's number plate. This is only required if you have more than one vehicle registered on your AT account. If not provided the first vehicle will be used.

## Run the script

```
npm start
```
