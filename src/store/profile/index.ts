import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
type ProfileType = {
  profile: {
    name: string;
    phone: string;
  }
  email: string;
}
type ProfileStateType = {
  data: ProfileType
  waiting: boolean

}
class ProfileState extends StoreModule {
  initState(): ProfileStateType {
    return {
      data: {} as ProfileType,
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async load(): Promise<void> {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
    });

    const { data } = await this.services.api.request({ url: `/api/v1/users/self` });

    // Профиль загружен успешно
    this.setState(
      {
        data: data.result,
        waiting: false,
      },
      'Загружен профиль из АПИ',
    );
  }

}

export default ProfileState;
