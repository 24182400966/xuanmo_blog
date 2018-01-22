<?php
	if ( post_password_required() ) { return; }
?>
<div id="comments" class="comments-area">
	<!-- 评论输入框 -->
	<?php
		$args['comment_field'] = '<p class="comment-form-comment"><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>';
		comment_form($args); ?>
	<!-- 评论列表 -->
	<ul class="comment-list">
	<?php
    function qiuye_comment($comment, $args, $depth) {
      $GLOBALS['comment'] = $comment;
	?>
    <li class="comment" id="li-comment-<?php comment_ID(); ?>">
			<a href="javascript:;" name="<?php echo $comment->comment_ID ;?>"></a>
      <div class="comment-body">
        <div class="comment-author">
					<div class="comment-author-header clearfix">
						<?php
							// 设置头像
							if (get_option('xm_options')['text_pic'] == 'off') {
								echo get_avatar($comment, 80);
							} else {
								if ($comment->comment_author_email == get_the_author_meta('user_email', $comment->user_id)) {
									$comment_author_url = get_the_author_meta('user_url', $comment->user_id);
									echo get_simple_local_avatar($comment->user_id);
								} else {
									// 获取评论者的url
									$comment_author_url
										= $comment->comment_author_url
										? $comment->comment_author_url
										: 'javascript:;';
									$color = '#' . mb_substr( md5(strtolower($comment->comment_author_email)), 0, 6 ,'UTF8');
			            $author = mb_substr( $comment->comment_author, 0, 1 ,'UTF8');
			            echo '<span class="avatar" style="background-color:' . $color . ';">' . $author . '</span>';
								}
							}
						?>
						<a href="<?php echo $comment_author_url; ?>" class="comment-author-url" target="_blank">
							<?php echo $comment->comment_author; ?>
						</a>
		        <?php get_author_class($comment->comment_author_email, $comment->comment_author_url, $comment->user_id); ?>
						<span class="hide user-information">
							<?php get_system_name($comment->comment_agent); ?>
						</span>
						<span class="hide user-information">
							<?php get_browser_name($comment->comment_agent); ?>
						</span>
						<span class="hide user-information">
							<?php echo convertip(get_comment_author_IP()); ?>
						</span>
						<p class="fr comment-btn">
							<?php
								comment_reply_link(
									array_merge(
										$args,
										array(
											'reply_text' => '回复',
											'depth' => $depth,
											'max_depth' => $args['max_depth']
										)
									)
								);
							?>
							<?php edit_comment_link('修改'); ?>
						</p>
					</div>
	        <div class="comment-meta commentmetadata">
						发表于：<?php echo get_comment_time('Y-m-d H:i'); ?>
					</div>
        </div>
        <div class="comment_content" id="comment-<?php comment_ID(); ?>">
          <div class="comment_text">
            <?php if ($comment->comment_approved == '0') : ?>
                <span>您的评论正在审核，稍后会显示出来！</span><br />
            <?php endif; ?>
            <?php comment_text(); ?>
          </div>
        </div>
      </div>
    </li>
	<?php
		}
	?>
	<?php wp_list_comments('type=comment&callback=qiuye_comment');?>
	</ul>
	<!-- 评论导航 -->
	<?php if ( have_comments() ) : ?>
		<?php if ( ! comments_open() ) : ?>
			<p class="no-comments"><?php _e( 'Comments are closed.', 'twentyfourteen' ); ?></p>
		<?php endif; ?>
		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
		<div id="comment-nav-below" class="navigation comment-navigation" role="navigation">
			<h3 class="screen-reader-text"><?php _e( 'Comment navigation', 'twentyfourteen' ); ?></h3>
			<div class="comment-page-btn">
				<?php previous_comments_link( __( '上一页', 'twentyfourteen' ) ); ?>
				<?php next_comments_link( __( '下一页', 'twentyfourteen' ) ); ?>
			</div>
		</div>
		<!-- #comment-nav-below -->
		<?php endif; // Check for comment navigation. ?>
	<?php endif; // have_comments() ?>
</div>
