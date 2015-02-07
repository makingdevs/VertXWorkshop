class Task {
  String uuid = UUID.randomUUID().toString().replace('-','')[0..15]
  String title
  String description

  def toMap() {
    [uuid: this.uuid, title:this.title, description:this.description]
  }
}
