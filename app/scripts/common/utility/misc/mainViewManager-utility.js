define(['common/main-layoutView'], function (MainLayout) {
    var mainLayout;
    return {
        init : function () {
            if (!mainLayout) {
                mainLayout = new MainLayout({el : '#appContainer'});
            }
            return mainLayout;
        }
    }
});
