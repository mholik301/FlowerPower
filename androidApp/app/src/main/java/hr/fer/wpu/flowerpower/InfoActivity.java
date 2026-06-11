package hr.fer.wpu.flowerpower;

import android.app.Activity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class InfoActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		//layout
		LinearLayout layout = new LinearLayout(this);
		layout.setOrientation(LinearLayout.VERTICAL);
		layout.setBackgroundColor(getColor(R.color.white));

		//logo
		ImageView logo = new ImageView(this);
		logo.setImageResource(R.drawable.logo);
		//logo.setAdjustViewBounds(true);
		LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(700, 550);
		layoutParams.gravity= Gravity.CENTER;
		logo.setLayoutParams(layoutParams);
		layout.addView(logo);

		//app name
		TextView appName = new TextView(this);
		appName.setText(R.string.app_name);
		appName.setTextSize(32);
		appName.setGravity(Gravity.CENTER_HORIZONTAL);
		layout.addView(appName);

		//address
		TextView address = new TextView(this);
		address.setText(R.string.adress);
		address.setTextSize(28);
		address.setGravity(Gravity.CENTER_HORIZONTAL);
		layout.addView(address);

		//phone
		TextView phone = new TextView(this);
		phone.setText(R.string.phone_num);
		phone.setTextSize(20);
		phone.setGravity(Gravity.CENTER_HORIZONTAL);
		phone.setPadding(0, 0, 0, 40);
		layout.addView(phone);

		//email
		TextView email = new TextView(this);
		String emailStr = getString(R.string.email);
		String printStr = "email: ";
		printStr += emailStr;
		email.setText(printStr);
		email.setTextSize(20);
		email.setGravity(Gravity.CENTER_HORIZONTAL);
		email.setPadding(0, 0, 0, 40);
		layout.addView(email);

		//url
		TextView webUrl = new TextView(this);
		webUrl.setText(R.string.url);
		webUrl.setTextSize(20);
		webUrl.setGravity(Gravity.CENTER_HORIZONTAL);
		webUrl.setPadding(0, 0, 0, 40);
		layout.addView(webUrl);

		//author
		TextView author = new TextView(this);
		String authorStr = getString(R.string.app_by) + getString(R.string.author);
		author.setText(authorStr);
		author.setTextSize(14);
		author.setGravity(Gravity.CENTER_HORIZONTAL);
		author.setPadding(0, 0, 0, 40);
		layout.addView(author);

		//draw the layout
		this.setContentView(layout);
	}
}