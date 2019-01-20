<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header text-white" style="background: url('./images/user-profile.jpg');">
                <h3 class="widget-user-username">Elizabeth Pierce</h3>
                <h5 class="widget-user-desc">Web Designer</h5>
              </div>
              <div class="widget-user-image">
                <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">3,200</h5>
                      <span class="description-text">SALES</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">13,000</h5>
                      <span class="description-text">FOLLOWERS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <h5 class="description-header">35</h5>
                      <span class="description-text">PRODUCTS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link active show" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active show" id="activity">
                      <h2 class="text-center">Display User Activity</h2>
                  </div>
                  <div class="tab-pane" id="settings">
                    <form class="form-horizontal" @submit.prevent="updateProfile">
                      <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                         <input v-model="form.name" type="text" name="name"
                                class="form-control"
                                placeholder="Name">
                        </div>

                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                          <input type="email"
                          v-model="form.email"
                          class="form-control"

                          id="inputEmail" placeholder="Email">
                        </div>

                      </div>
                      <div class="form-group">
                        <label for="bio" class="col-sm-2 control-label">Bio</label>

                        <div class="col-sm-10">
                          <textarea class="form-control"
                          v-model="form.bio"
                          id="bio"
                          placeholder="Short bio for User"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                          <label for="type" class="col-sm-2 control-label">Type</label>
                          <div class="col-sm-10">
                               <select v-model="form.type"
                               class="form-control">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                          </select>
                          </div>
                      </div>
                      <div class="form-group">
                        <label for="photo" class="col-sm-2 control-label">Profile Photo</label>

                        <div class="col-sm-10">
                          <input type="file" @change="updateProfilePic" name="photo">

                        </div>
                      </div>
                      <div class="form-group">
                        <label for="password" class="col-sm-2 control-label">Password</label>

                        <div class="col-sm-10">
                          <input type="password"
                          v-model="form.password"
                          class="form-control"
                          id="password" placeholder="password">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" class="btn btn-danger">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: new Form({
                 id: '',
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''
            })
        }
    },
    methods: {
        getProfilePhoto(){
            let photo = (this.form.photo.length > 100) ? this.form.photo : "images/profile/"+this.form.photo;
            return photo;
        },
        updateProfile() {
            axios.put('api/profile', this.form)
                .then(res => {
                    console.log(res);
                    eventBus.$emit('afterCreate');
                }).catch(error => {

                })
        },
        updateProfilePic(e){
            var file = e.target.files[0];
            var reader = new FileReader();
            console.log(file);
            if(file['size'] <= 2111775){
                 reader.onloadend = (file) => {
                // console.log('RESULT', reader.result)
                this.form.photo = reader.result;
                }
                reader.readAsDataURL(file);
            }else{
                 Swal(
                        'Oops!',
                        'Your profile is greater than 2 MB.',
                        'warning'
                    )
            }

        },
        getProfile() {
            axios.get('api/profile')
            .then(res => {
                console.log(res.data);
                this.form = res.data;
            }).catch(error => {

            })
        }
    },
    created() {
        this.getProfile();
        eventBus.$on('afterCreate', () => this.getProfile());
    }

}
</script>

<style scoped>
    .widget-user-header{
        background-position: center center;
        background-size: cover;
        height: 250px;
    }
</style>
