export class LoginModel {
  email: string;
  uid: string;
  displayName: string;
  photoUrl: string;
  token: string;


  constructor(authData) {
    this.email = authData.user.email;
    this.displayName = authData.user.displayName;
    this.photoUrl = authData.user.photoURL;
    this.uid = authData.user.uid;
    this.token = authData.credential.accessToken;
  }

  toJson() {
    return {
      'email': this.email,
      'displayName': this.displayName,
      'photoUrl': this.photoUrl,
      'uid': this.uid,
      'token': this.token,
    };
  }
}

export interface UserModel {
  email?: string;
  uid?: string;
  displayName?: string;
  photoUrl?: string;
  token?: string;
  createdOn?: Date;
  createdBy?: string;
}

